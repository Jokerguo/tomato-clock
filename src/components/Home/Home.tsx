import * as React from 'react';
import {Dropdown, Menu} from 'antd';
import {SettingOutlined, LoginOutlined, UserOutlined} from '@ant-design/icons';
import axios from '../../config/axios';
import history from '../../config/history';
import Todos from '../Todos/Todos';
import './Home.scss';

const LoginOut = () => {
  localStorage.setItem('x-token', '');
  history.push('/login');
};

const menu = (
  <Menu>
    <Menu.Item>
      <span><SettingOutlined/>个人设置</span>
    </Menu.Item>
    <Menu.Item>
      <span onClick={LoginOut}><LoginOutlined/>注销</span>
    </Menu.Item>
  </Menu>
);


class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async UNSAFE_componentWillMount() {
    await this.getMe();
  }

  getMe = async () => {
    const response = await axios.get('me');
    if (response) {
      this.setState({user: response.data});
    }

  };

  render() {
    return (
      <div className='Home'>
        <header>
          <span className="logo">LOGO</span>
          <Dropdown overlay={menu}>
            <span><UserOutlined style={{marginRight: '10px'}}/>{this.state.user.account}</span>
          </Dropdown>
        </header>
        <Todos/>
      </div>
    );
  }
}

export default Home;