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

  if (!content || !chatId) {
    return res.status(400).json({ error: "Invalid data passed into request" });
  }

  try {
    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId._id,
    };

    let message = await Message.create(newMessage)
      .populate("sender", "name pic")
      .populate("chat")
      .execPopulate();

    await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId._Id, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = { allMessages, sendMessage };
