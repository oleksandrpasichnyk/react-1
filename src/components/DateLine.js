import React from 'react';
import '../styles/MessageList.css'

class DateLine extends React.Component {
  constructor(props){
    super();
    this.state = {
      date: new Date(props.date),
      isVisible: props.isVisible,
    };
    this.getMessagesDate = this.getMessagesDate.bind(this);
    this.getDifferenceInDays = this.getDifferenceInDays.bind(this);
    this.getFormatedMonth = this.getFormatedMonth.bind(this);
  };

  // componentDidMount(){
  //   console.log(this.state, new Date(this.props.date))
  // }

  getFormatedMonth(){
    let mouth = this.state.date.getMonth() + 1;
    return mouth < 10 ? `0${mouth}` : mouth;
  }

  getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  getMessagesDate(){
    if(this.getDifferenceInDays(this.state.date, new Date()) === 0){
      return 'Today'
    }
    else if(this.getDifferenceInDays(this.state.date, new Date()) === 1){
      return 'Yesterday'
    }
    else {
      return `${this.state.date.getDate()}.${this.getFormatedMonth()}.${ this.state.date.getFullYear() }`;
    }
  }
  
  render() {
    return this.state.isVisible ? (
      <div className= 'date-line-block'>
        <div className= 'date-line-text-block'>
          <p className= 'date-line-text'>{ this.getMessagesDate() }</p>
        </div>
        <hr></hr>
      </div>
    ) : null
  }
}

export default DateLine;