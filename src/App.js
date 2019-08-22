import React from 'react';
import './App.css';
// import Messages from './Messages';
// ///if you want to move the display messages to another component
import Form from './Form';
import { Container, Row, Col } from 'reactstrap';
import * as moment from 'moment';
import Socket from './utils/socket';


class App extends React.Component{
  state = {
    messages: [
      {username: 'Edwind', message: 'What did the ocean say to another ocean?', timestamp: 1544532325758},
      {username: 'Liren', message: 'sea you later?', timestamp: 1544532341078},
      {username: 'Edwind', message: 'Nothing. It just waved', timestamp: 1544532347412},
      {username: 'Josh', message: "I'm leaving this chatroom", timestamp: 1544532402998},
    ],
    userlist: [
      {username: ''},
    ]
    //list of the users
  }

  onSendMessage = text => {
    
    //wrapped this.state.messages in [] beacuse messages is an object and push is a function. so we need to interpret the object as an array
    //need to add an ellpises in order to add the previous messages onto it

    Socket.emit('BROADCAST_MESSAGE',  {
      "username": this.state.username,
      "message": text,
      "timestamp": Date.now()
    });
  }


  // need to push this (push adds a new item to the array)
  // onSendMessage = text => {
  //   const messages = [...this.state.messages]
  //   //wrapped this.state.messages in [] beacuse messages is an object and push is a function. so we need to interpret the object as an array
  //   //need to add an ellpises in order to add the previous messages onto it
  //   messages.push({
  //     "username": '',
  //     "message": text,
  //     "timestamp": Date.now()
  //   });
  //   this.setState({messages})
  // }
  
componentDidMount() {
 // Once the chat app is loaded, we tell server that we are joining
  Socket.emit('NEW_USER')

  Socket.on('GET_CURRENT_USER', newUser => {
    this.setState({
      username: newUser.username
    });
    // console.log(this.state.username)
  });

  //below moved to form component

  //ONLY WHEN YOU HIT THE SUBMIT
  // Socket.on('BROADCAST_MESSAGE', data => {
  //   console.log(data)
  //   //message: "ojdoifjdfjogdjifg"
  // //timestamp: 1558694012822
  // //username: "Restful Lobster"
  //   });


  Socket.on('RECEIVE_BROADCAST', data => {
    const messages = [...this.state.messages]
    messages.push({ 
      "username": data.username,
      "message": data.message,
      "timestamp": data.timestamp
    });
    this.setState({messages})
  
    //   const messages = [...this.state.messages]
  //   //wrapped this.state.messages in [] beacuse messages is an object and push is a function. so we need to interpret the object as an array
  //   //need to add an ellpises in order to add the previous messages onto it
  //   messages.push({
  //     "username": '',
  //     "message": text,
  //     "timestamp": Date.now()
  //   });

    });


  // Socket.on('HAS_ERROR', error) => {
  //   'error' + error
  // }
  Socket.on("HAS_ERROR", () => {
    Socket.emit("HAS_ERROR", 'Something went wrong on the server!')
  })


  

  Socket.on('UPDATE_USER_LIST', data => {
    this.setState({userlist: data})
    // console.log(data)
    });

  // this.empty.scrollIntoView({behavior: "smooth"})
}

  componentDidUpdate() {
    this.empty.scrollIntoView({behavior: "smooth"})
  }

  render() {
    return (
      <Container fluid> 

        {/* Main row */}
        <Row className="div_main">

          {/* Left Column: User List */}
          <Col xs="3" sm="3" md = "3" lg = "3" className = 'text-left bg-dark left_column'>
          {/* color is #343a40 */}
            <h1 className = 'text-white'>User List</h1>
            <div className = "div_user_list">
              {this.state.userlist.map((userlist,index) => (
                <div key = {index} className = "div_user">
                  <div>{userlist.username}</div>
                </div>
              ))}
            </div>

          </Col>

          {/* Right Column: Chat App */}
          <Col xs="9" sm="9" md = "9" lg = "9" className = "col_right">
            
            <div className = 'div_message_list' >

              <h1>Chat App</h1>

              <div className = 'div_chat'>
                {this.state.messages.map((messages,index) => (<div key={index}>

                    <div className = 'img_column'>
                      <img className = 'div_img' src = {`https://api.adorable.io/avatars/150/${messages.username}.png`} alt = '' width = '50' height = '50' />
                    </div>

                    <div className = 'chat_column'>
                      <div className = 'chat_bubble'>
                        <div className= "div_user">{messages.username}</div>
                        <div>{messages.message}</div>
                        {/* moment(testDate).format('MM/DD/YYYY'); */}
                        <div>{moment(messages.timestamp).format('LTS')}</div>
                      </div>
                    </div>

                  </div>
                  ))}   
              </div>

              <div ref = {(elem) => {this.empty = elem}}/>    
            </div>

            <Form onSendMessage={this.onSendMessage}/>
          </Col>

        </Row>
        
      </Container>
    );
  }
}

export default App;
