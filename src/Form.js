// textInput state
// When user types on the text input, a textInput state should be updated accordingly.

import React, { Component } from 'react'
import { Input } from 'reactstrap';


class Form extends Component {
  state = {
    text: '',
  }

  handleInput = e => {
    this.setState({ text: e.target.value })
  }
    // triggers a render whenever the text field changes

  sendMessage = e => {
      // function for sending the message
    e.preventDefault();
    this.props.onSendMessage(this.state.text);
    this.setState({text: ""});
    //onSendMessage is a function defined in the App. passing the state to be a prop
  }

//ONLY WHEN YOU HIT THE SUBMIT
  // Socket.on('BROADCAST_MESSAGE', data => {
  //   console.log(data)
  //   //message: "ojdoifjdfjogdjifg"
  // //timestamp: 1558694012822
  // //username: "Restful Lobster"
  //   });



  //Do not allow users to submit form if there is no text input
    //After triggering sendMessage, the existing text input should be cleared
    //Do not allow users to type more than 500 characters. Show error message when that happens.

  render() {  
    const { text } = this.state
    return (
      <form onSubmit={this.sendMessage}>
        <Input type="text" value={text} onChange={this.handleInput} placeholder="Enter message"/>
        {/* <Input type="submit" onSubmit={this.sendMessage}/> */}
      </form>
    )
  }
}

//---------------using handleinput
// onChange(e) {
//     this.setState({text: e.target.value});
//   }

////---------------using onsubmit
// onSubmit(e) {
//     e.preventDefault();
//     this.setState({text: ""});
//     this.props.onSendMessage(this.state.text);
//   }

//       <div className="Input">

//         <form onSubmit={e => this.onSubmit(e)}>---------------------
//           <input onChange={e => this.onChange(e)}
//             value={this.state.text}  ---------------------
//             type="text"
//             placeholder="Enter your message and press ENTER"
//             autofocus="true"
//           />

//           <button>Send</button>
//         </form>

//       </div>

export default Form
