import React from 'react';
import {Checkbox} from 'antd';

interface ITodoItem {
  id: number,
  description: string,
  completed: boolean
  update: (id: number, params: any) => void
}

class TodoItem extends React.Component<ITodoItem> {

  update = (params: any) => {
    this.props.update(this.props.id, params);
  };

  render() {
    return (
      <div>
        <Checkbox checked={this.props.completed}
                  onClick={e => this.update({completed: (e.target as HTMLInputElement).checked})}/>
        <span>{this.props.description}</span>
      </div>
    );
  }
}

export default TodoItem;
