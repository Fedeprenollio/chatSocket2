import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import e from "cors";

const sockt = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };
    sockt.on("message", receiveMessage);

    return () => sockt.off("message", receiveMessage);
  }, [messages]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const hanleSubmit = (e) => {
    e.preventDefault();
    sockt.emit("message", message);
    const newMessage = {
      body: message,
      from: "Yo",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
  };

  return (
    <div className="App">
      <form className="form" onSubmit={hanleSubmit} action="">
        <h2>Chat con socket.io</h2>
        <input
          className="input"
          onChange={onChange}
          type="text"
          name=""
          id=""
          value={message}
        />
        {/* <button className="btn" type="submit">
          Enviar
        </button> */}
        <ul>
          {messages.map((m, i) => (
            <li className={`${m.from === "Yo" ? "me" : "other"}`} key={i}>
              <p>
                {m.from}: {m.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
