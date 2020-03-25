import React from 'react';
import {connect} from 'react-redux';
import {updateTodo} from '../../redux/actions/todos';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import './Todos.scss';


class Todos extends React.Component<any> {

  get unDeletedTodos() {
    return this.props.todos.filter((t: any) => !t.deleted);
  };

  get unCompletedTodos() {
    return this.unDeletedTodos.filter((t: any) => !t.completed);
  };


  render() {
    return (
      <div className='Todo'>
        <TodoInput/>
        <main>
          {this.unCompletedTodos.map((t: any) => <TodoItem
            key={t.id} {...t}/>)}
        </main>
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
  updateTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);

