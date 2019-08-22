  //Create a component where we display all the chat messages. 
//We will use conversations state with this structure:

//conversations should be an array of objects with username, message and timestamp keys.

// Timestamp
// The value is the result of calling Date.now(), which returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.

// When a user sends a message, we call Date.now() and store the value.

// To display it in a human readable format, we can use momentjs to format it.

import React, { Component } from 'react'

class Messages extends Component {

  renderMessage = (message) => {
    // renders the message from the array
    //username: 'Edwind', message: 'What did the ocean say to another ocean?', timestamp: 1544532325758}
    //use backticks? 
    const {username, message} = message;
    const {currentUsername} = this.props;
    const messageFromMe = username.id === currentUsername.id;
    const className = messageFromMe ?
    "Messages-message currentUsername" : "Messages-message";
    return (
      <li className={className}>
        <span
          className="avatar"
          style={{backgroundColor: username.clientData.color}}
        />
        <div className="Message-content">
          <div className="username">
            {username.clientData.username}
          </div>
          <div className="message">{message}</div>
        </div>
      </li>
    );
  }

  // handleToggle = () => {
  //   const { toggleTask, todo } = this.props
  //   toggleTask(todo.id)
  // }

  // handleDelete = () => {
  //   const { deleteTask, todo } = this.props
  //   deleteTask(todo.id)
  // }

  render() {
    const { messages } = this.props
    return (
      <ul className = "Messages-List">
        {messages.map(m => this.renderMessage(m)
          );
        }
      </ul>

      // <li
      //   style={{
      //     textDecoration: todo.done ? 'line-through' : 'none',
      //     color: todo.done ? 'red' : 'green'
      //   }}
      // >
      //   <span onClick={this.handleToggle}>{todo.task}</span>
      //   <button onClick={this.handleDelete}>X</button>
      // </li>
    )
  }
}

export default Messages