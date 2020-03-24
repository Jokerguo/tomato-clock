import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../../redux/actions/todos';
import {Input} from 'antd';
import {EnterOutlined} from '@ant-design/icons';
import axios from '../../config/axios'

interface TodoInputState {
  description: string
}
interface ITodoInputProps {
  addTodo: (payload:any) => any;
}

class TodoInput extends React.Component<ITodoInputProps,TodoInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    };
  }

  postTodo = async () => {
    try {
      let response = await axios.post('todos',{description: this.state.description});
      this.props.addTodo(response.data.resource)
    }catch (e) {
      throw new Error(e)
    }
      this.setState({description: ''});
  };

  onKeyUp = async (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      await this.postTodo();
    }
  };

  render() {
    const {description} = this.state;
    const suffix = description ? <EnterOutlined onClick={() => this.postTodo()}/> : <span/>;
    return (
      <div >
        <Input placeholder="添加任务" suffix={suffix} value={description}
               onChange={e => this.setState({description: e.target.value})}
               onKeyUp={this.onKeyUp} />
      </div>
    );
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    ...ownProps
  };
};
const mapDispatchToProps = {
  addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
