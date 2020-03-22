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

  get unDeletedTodos(){
    return this.state.todos.filter(t => !t.deleted)
  };

  get unCompletedTodos(){
    return this.unDeletedTodos.filter(t => !t.completed)
  };

  get completedTodos(){
     const a =this.unDeletedTodos.filter(t => t.completed);
    console.log(a);
    return this.unDeletedTodos.filter(t => t.completed)
  };

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
  toEditing =(id: number)=>{
    const {todos} = this.state;
    const newTodos = todos.map(t =>{
      if(id === t.id){
        return Object.assign({},t,{editing : true})
      } else {
        return Object.assign({}, t, {editing: false})
      }
    });
    this.setState({todos: newTodos})
  };

  render() {
    return (
      <div className='Todo'>
        <TodoInput addTodo={(params: any) => this.addTodo(params)}/>
        <main>
          {this.unCompletedTodos.map((t: any) => <TodoItem
            key={t.id} {...t} update={(this.updateTodo)} toEditing={this.toEditing}/>)}
          {this.completedTodos.map((t: any) => <TodoItem
            key={t.id} {...t} update={(this.updateTodo)} toEditing={this.toEditing}/>)}
        </main>
      </div>
    );
  }
}

export default Todos;

