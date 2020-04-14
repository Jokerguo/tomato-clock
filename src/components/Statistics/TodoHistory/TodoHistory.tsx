import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import dayjs from 'dayjs';
import {Tabs} from 'antd';
import './TodoHistory.scss';
import TodoHistoryTodoItem from './TodoHistoryTodoItem';

const {TabPane} = Tabs;

interface ITodoHistoryProps {
  todos: any[]
}


class TodoHistory extends React.Component<ITodoHistoryProps> {

  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted);
  }

  get deletedTodos() {
    return this.props.todos.filter(t => t.deleted);
  }

  get dailyFinishedTodos() {
    return _.groupBy(this.finishedTodos, (todo) => {
      return dayjs(todo.updated_at).format('YYYY-MM-DD');
    });
  }


  get finishedDates() {
    return Object.keys(this.dailyFinishedTodos);
  }


  render() {
    const finishedTodoList = this.finishedDates.map(date => {
      return (
        <div key={date} className='dailyTodos'>
          <div className='summary'>
            <p className='date'>
              <span>{date}</span>
            </p>
            <p>完成{this.dailyFinishedTodos[date].length}个任务</p>
          </div>
          <div className='todoList'>
            {this.dailyFinishedTodos[date].map(todo => {
              return <TodoHistoryTodoItem itemType='finished' key={todo.id} todo={todo}/>;
            })}
          </div>
        </div>
      );
    });

    const deletedTodoList = this.deletedTodos.map(todo => {
      return (
        <TodoHistoryTodoItem key={todo.id} todo={todo} itemType='deleted'/>
      );
    });
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="已完成的任务" key="1">
            <div className='TodoHistory'>
              {finishedTodoList}
            </div>
          </TabPane>
          <TabPane tab="已删除的任务" key="2">
            <div className='TodoHistory'>
              {deletedTodoList}
            </div>
          </TabPane>
        </Tabs>
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

export default connect(mapStateToProps)(TodoHistory);
