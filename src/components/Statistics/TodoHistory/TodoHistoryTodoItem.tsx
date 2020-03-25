import React from 'react';
import dayjs from 'dayjs';
import {connect} from 'react-redux';
import './TodoHistoryTodoItem.scss';
import {updateTodo} from '../../../redux/actions/todos';
import axios from '../../../config/axios';

interface ITodoHistoryTodoItemProps {
  todo: any
  itemType: string
  updateTodo: (payload: any) => void
}

class TodoHistoryTodoItem extends React.Component<ITodoHistoryTodoItemProps> {

  updateTodo = async ( params: any) => {
    try {
      const response = await axios.put(`todos/${this.props.todo.id}`, params);
      this.props.updateTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    let action, formatText, time;
    if (this.props.itemType === 'finished') {
      formatText = 'HH:mm';
      time = this.props.todo.created_at;
      action = (
        <div className='action'>
          <span onClick={()=>this.updateTodo({finished: false})}>恢复</span>
          <span onClick={()=>this.updateTodo({deleted: true})}>删除</span>
        </div>
      );
    } else if (this.props.itemType === 'deleted') {
      formatText = 'YYYY-MM-DD';
      time = this.props.todo.updated_at;
      action = (
        <div className='action'>
          <span  onClick={()=>this.updateTodo({deleted: false})}>恢复</span>
        </div>
      );
    }
    return (
      <div className='TodoHistoryTodoItem'>
        <div className={'text'}>
          <span className='time'>{dayjs(time).format(formatText)}</span>
          <span className='description'>{this.props.todo.description}</span>
        </div>
        {action}
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
  updateTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistoryTodoItem);
