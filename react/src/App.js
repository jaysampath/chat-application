import './App.css';
import { useEffect, useState } from 'react';

let ws;
const websocketUrl = "ws://localhost:8080/chat"

function App() {

  const [userName, setUserName] = useState('');
  const [isConnected, setIsConnect] = useState(false);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if(isConnected) {
    ws.onmessage = (e) => { 
      console.log(e); 
      console.log('current messages stack', messages)
      console.log('appending received message- ', e.data);
      setMessages([...messages, e.data]);
      console.log('messages after appending- ', messages);
    };
  }
  }, [isConnected, messages])

  const connectToWebsocket = () => {
    if(userName == null) {
      console.log("username cannot be emtpy");
      return;
    }
    ws = new WebSocket(websocketUrl)
    console.log("Connected to websocket");
    setIsConnect(true);

    
  }

  const userNameHandler = (e) => {
    console.log("Name- " + e.target.value);
    setUserName(e.target.value);
  }

  const messageHandler = (e) => {
    console.log("message- " + e.target.value);
    setMessage(e.target.value);
  }

  const sendMessage = () => {
    const currMessage = message;
    console.log('sending- ', currMessage);
    ws.send(message);
    setMessages([...messages, currMessage]);
    setMessage('')
  }

  
  return (
    <div className="App-header">
      <div>
        <input type='text' placeholder='Enter your name' onChange={userNameHandler} disabled={isConnected}/>
        <button onClick={connectToWebsocket} disabled={isConnected}>{isConnected ? 'Connected!' : 'Connect'} </button>
      </div>
      {
        isConnected && <div>
        <input type='text' placeholder='Enter your message' onChange={messageHandler}/>
        <button onClick={sendMessage}>Send </button>

        <div>
           <h3>Chat</h3>
           {messages && messages.map((message, index) => (
                            <ul key={index}>
                                {<div className="p-2">{message}</div>}
                            </ul>
                        ))}
          </div>
        </div>
      }
    </div>
  );
}

export default App;
