import React from 'react';
import {Button,Modal,Input} from 'antd';
import axios from '../../config/axios';
import CountDown from './CountDown';
import {CloseSquareOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import './TomatoAction.scss';

interface ITomatoActionProps {
  startTomato: () => Promise<void>
  updateTomato: (payload: any) => void
  unfinishedTomato: any,

}

interface ITomatoActionState {
  description: string
}

const { confirm } = Modal;

class TomatoAction extends React.Component<ITomatoActionProps, ITomatoActionState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    };
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.updateTomato({description: this.state.description, ended_at: new Date()});
      this.setState({description: ''});
    }
  };

  onFinish = () => {
    this.forceUpdate();
  };

   showConfirm = ()=> {
    confirm({
      title: '目前正在一个番茄工作时间中，确定要放弃这个番茄吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: ()=> {
        this.abortTomato()
      },
      onCancel() {},
      cancelText : '取消',
      okText : '确定'
    });
  };


  abortTomato = async () => {
    this.updateTomato({aborted: true});
    document.title = '番茄闹钟';

  };

  updateTomato = async (params: any) => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,
        params);
      this.props.updateTomato(response.data.resource);
      this.setState({description: ''});
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    let html = <div/>;
    if (this.props.unfinishedTomato === undefined) {
      html = <Button className="startTomatoButton" onClick={() => {this.props.startTomato();}}>开始番茄</Button>;
    } else {
      const startedAt = Date.parse(this.props.unfinishedTomato.started_at);
      const duration = this.props.unfinishedTomato.duration;
      const timeNow = new Date().getTime();
      if (timeNow - startedAt > duration) {
        html = <div className="inputWrapper">
          <Input value={this.state.description}
                 placeholder="请输入你刚刚完成的任务"
                 onChange={e => this.setState({description: e.target.value})}
                 onKeyUp={e => this.onKeyUp(e)}/>
          <CloseSquareOutlined className='abort' onClick={this.showConfirm}/>
        </div>;
      } else if (timeNow - startedAt < duration) {
        const timer = duration - timeNow + startedAt;
        html = (
          <div className="countDownWrapper">
            <CountDown duration={duration} timer={timer} onFinish={this.onFinish}/>
            <CloseSquareOutlined className='abort' onClick={this.showConfirm}/>
          </div>
        );
      }
    }
    return (
      <div className='TomatoAction'>
        {html}
      </div>
    );
  }
}

export default TomatoAction;
