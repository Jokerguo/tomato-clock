import * as React from 'react';
import {Button} from 'antd';


class Index extends React.Component<any> {

  ToLogin = () => {
    this.props.history.push('/login')
  };

  render() {
    return (
      <Button onClick={this.ToLogin}>登录</Button>
    );
  }
}

export default Index;