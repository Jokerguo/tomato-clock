import React from 'react';
import {connect} from 'react-redux';
import {initTodos,updateTodo} from '../../redux/actions';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import axios from '../../config/axios';
import './Todos.scss';


class Todos extends React.Component<any> {
  get unDeletedTodos() {
    return this.props.todos.filter((t: any) => !t.deleted);
  };

  get unCompletedTodos() {
    return this.unDeletedTodos.filter((t: any) => !t.completed);
  };

  get completedTodos() {
    return this.unDeletedTodos.filter((t: any) => t.completed);
  };


  async UNSAFE_componentWillMount() {
    await this.getTodos();
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map((t: any) => Object.assign({}, t, {editing: false}));
      this.props.initTodos(todos);
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    return (
      <div className='Todo'>
        <TodoInput/>
        <main>
          {this.unCompletedTodos.map((t: any) => <TodoItem
            key={t.id} {...t}/>)}
          {this.completedTodos.map((t: any) => <TodoItem
            key={t.id} {...t} />)}
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
  initTodos,
  updateTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);

