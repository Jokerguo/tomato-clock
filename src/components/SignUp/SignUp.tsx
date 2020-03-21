import React from 'react';
import {Button, Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import axios from '../../config/axios'
import { Link } from 'react-router-dom';
import './SignUp.scss'

interface SignUpState {
  account: string,
  password: string,
  passwordConfirmation: string
}

class SignUp extends React.Component<any, SignUpState> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConfirmation: ''
    };
  }

  onChangeAccount = (e: any) => {
    this.setState({account: e.target.value});
  };

  onChangePassword = (e: any) => {
    this.setState({password: e.target.value});
  };
  onChangePasswordConfirmation = (e: any) => {
    this.setState({passwordConfirmation: e.target.value});
  };
  submit = async () => {
    const {account, password, passwordConfirmation} = this.state;
    try {
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: passwordConfirmation
      });
      this.props.history.push('/')
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    const {account, password, passwordConfirmation} = this.state;
    return (
      <div className='SignUp'>
        <h1>注册番茄</h1>
        <Input placeholder="请输入用户名" prefix={<UserOutlined/>}
               value={account} onChange={this.onChangeAccount}/>
        <Input.Password placeholder="请输入密码" value={password}
                        onChange={this.onChangePassword}/>
        <Input.Password placeholder="确认密码" value={passwordConfirmation}
                        onChange={this.onChangePasswordConfirmation}/>
        <Button className='button' onClick={this.submit}>注册</Button>
        <p>如果已注册用户,请立即<Link to={`/login`} >登录</Link></p>
      </div>
    );
  }
}

export default SignUp;