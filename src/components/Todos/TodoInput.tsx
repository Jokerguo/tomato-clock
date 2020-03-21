import React from 'react';
import {Input} from 'antd';
import {EnterOutlined} from '@ant-design/icons';

interface TodoInputState {
  description: string
}

class TodoInput extends React.Component<any, TodoInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    };
  }

  addTodo = () => {
      this.props.addTodo({description: this.state.description});
      this.setState({description: ''});
  };

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.addTodo();
    }
  };

  render() {
    const {description} = this.state;
    const suffix = description ? <EnterOutlined onClick={() => this.addTodo()}/> : <span/>;
    return (
      <div className='TodoInput'>
        <Input placeholder="添加任务" suffix={suffix} value={description}
               onChange={e => this.setState({description: e.target.value})}
               onKeyUp={this.onKeyUp}/>
      </div>
    );
  }
}

export default TodoInput;