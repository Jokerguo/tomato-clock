import React from 'react';
import {connect} from 'react-redux';
import {editTodo,updateTodo} from '../../redux/actions/todos';
import {Checkbox} from 'antd';
import {DeleteOutlined, EnterOutlined} from '@ant-design/icons';
import classNames from 'classnames'
import './TodoItem.scss'
import axios from '../../config/axios';

interface ITodoItem {
  id: number,
  description: string,
  completed: boolean
  editing: boolean,
  editTodo: (id: number) => any;
  updateTodo: (payload: any) => any
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

  updateTodo = async (params: any) => {
    try {
      const response = await axios.put(`todos/${this.props.id}`, params);
      await this.props.updateTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  editTodo = () => {
    this.props.editTodo(this.props.id);
  };

  onKeyUp = async (e: any) => {
    if (e.keyCode === 13 && this.state.exitText !== '') {
      await this.updateTodo({description: this.state.exitText});
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
            return this.updateTodo({deleted: true})
          }}/>
        </div>
      </div>
    );
    const Text = (
      <span className='text' onDoubleClick={this.editTodo}>{this.state.exitText}</span>
    );
    const todoItemClass = classNames({
      TodoItem : true,
      editing : this.props.editing,
      completed : this.props.completed
    });

    return (
      <div className={todoItemClass} id='todoItem'>
        <Checkbox checked={this.props.completed}
                  onClick={e => this.updateTodo({completed: (e.target as HTMLInputElement).checked})}/>
        {this.props.editing ? Editing : Text}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    todos: state.todos,
    ...ownProps
  };
};
const mapDispatchToProps = {
  editTodo,
  updateTodo
};


export default connect(mapStateToProps,mapDispatchToProps)(TodoItem);
