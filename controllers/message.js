const Message = require("../models/message");
const Conversation = require("../models/conversation");

const getConversation = async (req, res) => {
  const { limit = 50, from = 0 } = req.query;
  const { id } = req.params;
  const query = { conversation: id };
  const messages = await Message.find(query)
    .skip(from)
    .limit(limit)
    .populate("sender")
    .populate("receiver");
  res.json({
    msg: "Conversations",
    messages,
  });
};

const postMessage = async (req, res) => {
  const { id, message, idsender, idreceiver, conversation } = req.body;
  try {
    const exitsConversation = await Conversation.findOne({
      $or: [
        {
          user: idsender,
          artist: idreceiver,
        },
        {
          artist: idsender,
          user: idreceiver,
        },
      ],
    });
    if (!exitsConversation) {
      const conversation = new Conversation({
        user: idsender,
        artist: idreceiver,
        last_message: Date.now(),
      });
      /*conversation.user = sender;
    conversation.artist = receiver;
    conversation.last_message = Date.now();*/
      const idConversation = await conversation.save();
      const newMessage = new Message({
        conversation: idConversation,
        sender: idsender,
        receiver: idreceiver,
        message,
      });
      await newMessage.save();
      return res.status(200).json({
        msg: `The Conversation has been created`,
      });
    } else {
      const idconversation = exitsConversation.id;
      const newMessage = new Message({
        conversation: idconversation,
        sender: idsender,
        receiver: idreceiver,
        message,
      });
      await newMessage.save();
      return res.status(200).json({
        msg: "Message Saved",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

module.exports = {
  getConversation,
  postMessage,
};
