import * as React from 'react';
import {Dropdown, Menu} from 'antd';
import {SettingOutlined, LoginOutlined, UserOutlined} from '@ant-design/icons';
import axios from '../../config/axios';
import history from '../../config/history';
import {connect} from 'react-redux';
import {initTodos} from '../../redux/actions/todos';
import {initTomatoes} from '../../redux/actions/tomatoes';
import Todos from '../Todos/Todos';
import Tomatoes from '../Tomatoes/Tomatoes';
import Statistics from '../Statistics/Statistics';
import './Home.scss';

const LoginOut = () => {
  localStorage.setItem('x-token', '');
  history.push('/login');
};

const menu = (
  <Menu>
    <Menu.Item>
      <span onClick={() => window.alert('还未设计个人设置页面，以后会继续完善')}><SettingOutlined/>个人设置</span>
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
    this.getTodos();
    this.getTomatoes();
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      if(response === undefined){return}
      const todos = response.data.resources.map((t: any) => Object.assign({}, t, {editing: false}));
      this.props.initTodos(todos);
    } catch (e) {
      throw new Error(e);
    }
  };

  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      if(response === undefined){return}
      this.props.initTomatoes(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };

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
          <span className="logo">
              <svg className="icon" aria-hidden="true">
                <use xlinkHref='#i-tomato'></use>
              </svg>
            番茄闹钟
          </span>
          <Dropdown overlay={menu}>
            <span><UserOutlined style={{marginRight: '10px'}}/>{this.state.user.account}</span>
          </Dropdown>
        </header>
        <main>
          <Tomatoes/>
          <Todos/>
        </main>
        <Statistics/>
      </div>
    );
  }
}


const mapStateToProps = (state: any, ownProps: any) => {
  return {
    todos: state.todos,
    ...ownProps
  };
};

const mapDispatchToProps = {
  initTodos,
  initTomatoes
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);