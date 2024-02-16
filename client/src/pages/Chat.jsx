import axios from "axios";
import { useEffect, useState } from "react";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/chats");
      const result = await response.data;
      setChats(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {chats.map((chat, index) => (
        <li key={index}>{chat.chatName}</li>
      ))}
    </div>
  );
};

export default Chat;
