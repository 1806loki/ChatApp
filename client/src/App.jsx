import "./App.css";
import Homepage from "./pages/Home";
import Chat from "./pages/Chat";
import { Routes, Route } from "react-router-dom";
 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/chats" element={<Chat />} />
       </Routes>
    </div>
  );
}

export default App;
