const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve messages" });
  }
};

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  

  try {
    if (!content || !chatId) {
      return res
        .status(400)
        .json({ error: "Invalid data passed into request" });
    }

    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId._id,
    };

    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");

    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    if (!updatedChat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    return res.json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = { allMessages, sendMessage };
