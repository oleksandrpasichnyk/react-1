import Spinner from './Spinner';
import React from 'react';
import Header from './Header'
import MessageList from './MessageList';
import '../styles/Chat.css'
import '../styles/MessageInput.css';


class Chat extends React.Component {
  constructor(){
    super();
    this.state = {
      isLoaded: false,
      messages: [],
      currentUserId: null,
      currentUser: null,
      currentUserAvatar: null,
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.makeid = this.makeid.bind(this);
  }

  componentDidMount() {
    fetch("https://edikdolynskyi.github.io/react_sources/messages.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            messages: result,
            currentUserId: result[0].userId,
            currentUser: result[0].user,
            currentUserAvatar: result[0].avatar,
          });
        },
        
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() *characters.length));
    };
    return result;
 }

  sendMessage(input){
    let messageText = input.value;
    if(messageText){
      let message = {
        "id": this.makeid(30),
        "userId": this.state.currentUserId,
        "avatar": this.state.currentUserAvatar,
        "user": this.state.currentUser,
        "text": messageText,
        "createdAt": new Date().toISOString(),
        "editedAt": ""
      };
  
      this.state.messages.push(message);

      this.setState({
        messages: this.state.messages,
      })

      input.value = '';
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.sendMessage(e.target);
    }
  }
  
  render() {
    if (this.state.error) {
      return <div>Помилка: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return (
        <div className='spinner-container'>
          <Spinner type="ThreeDots" color="#00BFFF" height={80} width={80} timeout={3000}/>
        </div>
      );
    } else {
      return (
        <div className = 'chat-container'>
          <Header messages={this.state.messages}></Header>
          <MessageList messagesData={{messages: this.state.messages, id: this.state.currentUserId}}></MessageList>
          <div className = 'message-input-block'>
            <input onKeyDown={(e) => this.handleKeyDown(e)} className='message-input'></input>
            <button onClick = {(e) => this.sendMessage(e.target.previousElementSibling)} className='message-send-btn'>Send</button>
          </div>
        </div>
      );
    }
  }
}

export default Chat;