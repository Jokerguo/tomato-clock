import React from 'react';
import {Button} from 'antd';

interface ITomatoActionProps {
  startTomato:()=> Promise<void>
  unfinishedTomato: any
}

class TomatoAction extends React.Component<ITomatoActionProps> {


  componentDidMount(): void {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        {/*{this.props.unfinishedTomato.id}*/}
        <Button className='startTomatoButton' onClick={() => this.props.startTomato()}>开始番茄</Button>
      </div>
    );
  }
}

export default TomatoAction;
