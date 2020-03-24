import React from 'react';
import './Tomatoes.scss';
import TomatoAction from './TomatoAction';
import {connect} from 'react-redux';
import {addTomato, initTomato} from '../../redux/actions/tomatoes';
import axios from '../../config/axios';

interface ITomatoProps {
  addTomato: (payload: any) => any
  tomatoes: any[]
}

class Tomatoes extends React.Component<ITomatoProps> {

  async UNSAFE_componentWillMount() {
    await this.getTomatoes();
  }

  get unfinishedTomato() {
    return this.props.tomatoes.filter(t => !t.description && !t.ender_at)[0];
  }

  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      console.log(response);
    } catch (e) {
      throw new Error(e);
    }
  };

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 1500000});
      this.props.addTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    return (
      <div className='Tomatoes'>
        <TomatoAction startTomato={this.startTomato} unfinishedTomato={this.unfinishedTomato}/>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    tomatoes: state.tomatoes,
    ...ownProps
  };
};
const mapDispatchToProps = {
  addTomato,
  initTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);
