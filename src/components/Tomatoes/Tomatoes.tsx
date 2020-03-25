import React from 'react';
import './Tomatoes.scss';
import TomatoAction from './TomatoAction';
import TomatoList from './TomatoList';
import {connect} from 'react-redux';
import {addTomato, initTomatoes, updateTomato} from '../../redux/actions/tomatoes';
import axios from '../../config/axios';
import _ from 'lodash';
import dayjs from 'dayjs';

interface ITomatoProps {
  addTomato: (payload: any) => any
  updateTomato: (payload: any) => any
  initTomatoes: (payload: any) => any
  tomatoes: any[]
}

class Tomatoes extends React.Component<ITomatoProps> {
  async componentDidMount() {
    await this.getTomatoes();
  }

  get unfinishedTomato() {
    return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0];
  }

  get finishedTomatoes() {
    const finishedTomatoes = this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
    return _.groupBy(finishedTomatoes, (tomato) => {
      return dayjs(tomato.started_at).format('YYYY-MM-DD');
    });
  }


  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      this.props.initTomatoes(response.data.resources);
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
        <TomatoAction startTomato={this.startTomato}
                      unfinishedTomato={this.unfinishedTomato && this.unfinishedTomato}
                      updateTomato={this.props.updateTomato}/>
        <TomatoList finishedTomatoes={this.finishedTomatoes}/>
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
  updateTomato,
  initTomatoes
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);
