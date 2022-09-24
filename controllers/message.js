const Message = require("../models/message");
const Conversation = require("../models/conversation");

const getConversation = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const { id } = req.params;
  const query = { conversation: id };
  const messages = await Message.find(query).skip(from).limit(limit);
  res.json({
    messages,
  });
};

const postMessage = async (req, res) => {
  const { id, sender, receiver, message } = req.body;
  console.log(req.body);
  const exitsConversation = await Conversation.findById(id);

  if (!exitsConversation) {
    const conversation = new Conversation({
      user: sender,
      artist: receiver,
      last_message: Date.now(),
    });
    /*conversation.user = sender;
    conversation.artist = receiver;
    conversation.last_message = Date.now();*/
    console.log("Hola");
    const idConversation = await conversation.save();
    console.log(idConversation);
    const newMessage = new Message({
      conversation: idConversation,
      sender,
      receiver,
      message,
    });
    await newMessage.save();
    return res.status(201).json({
      msg: `The Conversation has been created`,
    });
  } else {
    console.log("Ahora andamios aqui");
    const newMessage = new Message({
      conversation: id,
      sender,
      receiver,
      message,
    });
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
