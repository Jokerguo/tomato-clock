import React from 'react';
import {Button, Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import axios from '../../config/axios'
import { Link } from 'react-router-dom';
import './Login.scss'

interface LoginState {
  account: string,
  password: string,
}

class Login extends React.Component<any, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
    };
  }

  onChangeAccount = (e: any) => {
    this.setState({account: e.target.value});
  };

  onChangePassword = (e: any) => {
    this.setState({password: e.target.value});
  };

  submit = async () => {
    const {account, password} = this.state;
    try {
      await axios.post('sign_in/user', {
        account,
        password,
      });
      console.log(this.props);
      this.props.history.push('/')
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    const {account, password} = this.state;
    return (
      <div className='Login'>
        <h1>登录番茄</h1>
        <Input placeholder="请输入用户名" prefix={<UserOutlined/>}
               value={account} onChange={this.onChangeAccount}/>
        <Input.Password placeholder="请输入密码" value={password}
                        onChange={this.onChangePassword}/>
        <Button className='button' onClick={this.submit}>登录</Button>
        <p>如果未注册用户,请立即<Link to={`/signUp`} >注册</Link></p>
      </div>
    );
  }
}

export default Login;