import React from 'react';
import TodoInput from './TodoInput';
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

  addTodo = async (params: any) => {
    const {todos} = this.state;
    try {
      const response = await axios.post('todos', params);
      this.setState({todos: [response.data.resources, ...todos]});
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

  render() {
    return (
      <div>
        <TodoInput addTodo={(params: any) => this.addTodo(params)}/>
        <main>
          {this.state.todos && this.state.todos.map((t) => <div key={t.id}>{t.description}</div>)}
        </main>
      </div>
    );
  }
}

export default Todos;

