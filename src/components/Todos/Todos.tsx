import React from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import axios from '../../config/axios';
import './Todos.scss';

interface ITodosState {
  todos: any[]
}

class Todos extends React.Component<any, ITodosState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: []
    };
  }

  addTodo = async (params: any[]) => {
    const {todos} = this.state;
    try {
      const response = await axios.post('todos', params);
      this.setState({todos: [response.data.resource, ...todos]});
    } catch (e) {
      throw new Error(e);
    }
  };

  async UNSAFE_componentWillMount() {
    await this.getTodos();
  }

  getTodos = async () => {
    const response = await axios.get('todos');
    this.setState({todos: response.data.resources});
  };

  updateTodo = async (id: number, params: any) => {
    const {todos} = this.state;
    const response = await axios.put(`todos/${id}`, params);
    const newTodos = todos.map(t => {
      if (id === t.id) {
        return response.data.resource;
      } else {
        return t;
      }
    });
    this.setState({todos: newTodos});
  };

  render() {
    return (
      <div className='Todo'>
        <TodoInput addTodo={(params: any) => this.addTodo(params)}/>
        <main>
          {this.state.todos.map(t => <TodoItem key={t.id} {...t} update={(this.updateTodo)}/>)}
        </main>
      </div>
    );
  }
}

export default Todos;

