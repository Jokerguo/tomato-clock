import React from 'react';
import './CountDown.scss'

interface ICountDownProps {
  timer: number
  duration: number
  onFinish: ()=> void
}

interface ICountDownState {
  countDown: number
}
let timeId: NodeJS.Timeout;

class CountDown extends React.Component<ICountDownProps, ICountDownState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countDown: this.props.timer
    };
  }

  get countDown(){
    const min = Math.floor(this.state.countDown / 1000 / 60);
    const second = Math.floor(this.state.countDown / 1000 % 60);
    return `${min}:${second < 10 ? `0${second}` : second}`;
  }

  componentDidMount() {
     timeId = setInterval(() => {
       document.title = `${this.countDown} - 番茄闹钟`;
      const time = this.state.countDown;
       this.setState({countDown: time - 1000});
      if (time < 1000) {
        document.title = '番茄闹钟';

        this.props.onFinish();
        clearInterval(timeId);
      }
    }, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(timeId)
  }

  render() {
    const percent = 1 - this.state.countDown/this.props.duration;
    return (
      <div className='CountDown'>
        <span className='restTime'>{this.countDown}</span>
        <div className='progress' style={{width: `${percent*100}%`}}/>
      </div>
    );
  }
}

export default CountDown;
