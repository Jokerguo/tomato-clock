import React from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import './Todos.scss'

class Todos extends React.Component<any> {

  addTodo = async (params: any) => {
    try {
      const response = await axios.post('todos', params);
      console.log(response.data);
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    return (
      <TodoInput addTodo={(params: any) => this.addTodo(params)}/>
    );
  }
}

export default Todos;

