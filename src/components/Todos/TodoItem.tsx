import React from 'react';
import {Checkbox} from 'antd';
import {DeleteOutlined, EnterOutlined} from '@ant-design/icons';
import classNames from 'classnames'
import './TodoItem.scss'

interface ITodoItem {
  id: number,
  description: string,
  completed: boolean
  update: (id: number, params: any) => void
  toEditing: (id: number) => void
  editing: boolean
}

interface ITodoItemState {
  exitText: string

}

class TodoItem extends React.Component<ITodoItem, ITodoItemState> {
  constructor(props: any) {
    super(props);
    this.state = {
      exitText: this.props.description
    };
  }

  update = (params: any) => {
    this.props.update(this.props.id, params);
  };

  toEditing = () => {
    this.props.toEditing(this.props.id);
  };

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.exitText !== '') {
      this.update({description: this.state.exitText});
    }
  };

  render() {
    const Editing = (
      <div className='edit'>
        <input type="text" value={this.state.exitText}
               onChange={e => this.setState({exitText: e.target.value})}
               onKeyUp={this.onKeyUp}/>
        <div className='iconWrapper'>
          <EnterOutlined/>
          <DeleteOutlined onClick={() => {
            return this.update({deleted: true})
          }}/>
        </div>
      </div>
    );
    const Text = (
      <span className='text' onDoubleClick={this.toEditing}>{this.state.exitText}</span>
    );
    const todoItemClass = classNames({
      TodoItem : true,
      editing : this.props.editing,
      completed : this.props.completed
    });

    return (
      <div className={todoItemClass} id='todoItem'>
        <Checkbox checked={this.props.completed}
                  onClick={e => this.update({completed: (e.target as HTMLInputElement).checked})}/>
        {this.props.editing ? Editing : Text}
      </div>
    );
  }
}

export default TodoItem;
