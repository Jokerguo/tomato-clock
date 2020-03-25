import React from 'react';
import dayjs from 'dayjs';
import './TomatoList.scss'

interface ITomatoListProps {
  finishedTomatoes: any
}

const TomatoItem = function (props: any) {
  return (
    <div className='TomatoItem'>
      <span className='time'>{dayjs(props.started_at).format('H:mm')} - {dayjs(props.ended_at).format('H:mm')}</span>
      <span className='description'>{props.description}</span>
    </div>
  );
};

class TomatoList extends React.Component<ITomatoListProps> {

  get dates() {
    let dates = Object.keys(this.props.finishedTomatoes);
    return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).splice(0, 3);
  }

  render() {
    const list = this.dates.map(d => {
      const tomatoes = this.props.finishedTomatoes[d];
      return (
        <div key={d} className='dailyTomatoes'>
          <div className='title'>
            <span className='dateTime'>{dayjs(d).format('M月DD日')}</span>
            <span className='finishedTomatoes'>共{tomatoes.length}个番茄</span>
          </div>
          {
            tomatoes.map((t: any) => <TomatoItem key={t.id} {...t}/>)
          }
        </div>
      );
    });
    return (
      <div className='TomatoList'>
        {list}
      </div>
    )
  }
}

export default TomatoList;
