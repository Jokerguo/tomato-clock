import * as React from 'react';
import {Button} from 'antd';
import axios from '../../config/axios';


class Index extends React.Component<any,any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user : {}
    }
  }

  async componentWillMount() {
    await this.getMe();
  }

  getMe = async () => {
      const response = await axios.get('me');
      if(response){
        this.setState({user : response.data})
      }

  };

  LoginOut = () => {
    localStorage.setItem('x-token','');
    this.props.history.push('/login');
  };

  render() {
    return (
      <>
      <p>欢迎 {this.state.user.account}</p>
      <Button onClick={this.LoginOut}>注销</Button>
      </>
    );
  }
}

export default Index;