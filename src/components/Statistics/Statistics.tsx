import React from 'react';
import './Statistics.scss'
import {connect} from 'react-redux';

interface IStatisticsProps {
  todos: any[]
}

class Statistics extends React.Component<IStatisticsProps> {
  constructor(props: any) {
    super(props);
    console.log(this.props);

  }

  get finishedTodos(){
    return this.props.todos.filter((t:any) => t.completed && !t.delected)
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
