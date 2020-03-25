import React from 'react';
import './Statistics.scss';
import {connect} from 'react-redux';
import Polygon from './Polygon';
import _ from 'lodash';
import dayjs from 'dayjs';

interface IStatisticsProps {
  todos: any[]
}

class Statistics extends React.Component<IStatisticsProps> {

  get finishedTodos() {
    return this.props.todos.filter((t: any) => t.completed && !t.delected);
  }

  get dailyTodos() {
    return _.groupBy(this.finishedTodos, (todo) => {
      return dayjs(todo.updated_at).format('YYYY-MM-DD');
    });
  }


  render() {
    return (
      <div id='Statistics'>
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            <span>{this.finishedTodos.length}个任务</span>
            <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
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

export default connect(mapStateToProps)(Statistics);
