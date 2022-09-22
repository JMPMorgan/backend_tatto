const Message = require("../models/message");
const Conversation = require("../models/conversation");

const getConversation = async (req, res) => {
  const { limit = 5, from = 0, id } = req.query;
  const query = { conversation: id };
  const messages = await Message.find(query).skip(from).limit(limit);
  res.json({
    messages,
  });
};

const postMessage = async (req, res) => {
  const { id, sender, receiver, message } = req.body;
  const exitsConversation = Conversation.findById(id);
  if (!exitsConversation) {
    const conversation = new Conversation();
    conversation.user = sender;
    conversation.artist = receiver;
    conversation.last_message = Date.now();
    const idConversation = await conversation.save((err, data) => data.id);
    const newMessage = new Message(idConversation, sender, receiver, message);
    await newMessage.save();
    return res.status(201).json({
      msg: `The Conversation has been created`,
    });
  } else {
    const newMessage = new Message(id, sender, receiver, message);
    await newMessage.save();
    return res.status(200).json({
      msg: "Message Saved",
    });
  }
};

module.exports = {
  getConversation,
  postMessage,
};
