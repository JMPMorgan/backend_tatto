const Conversation = require("../models/conversation");
const Message = require("../models/message");

const getConversations = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.find({
      $or: [
        {
          user: id,
        },
        {
          artist: id,
        },
      ],
    })
      .populate("user")
      .populate("artist")
      .sort({ creation_date: -1 });
    const conversations = conversation.map((info) => {
      const { user, artist, _id } = info;
      if (user._id.toString() === id) {
        return { user, artist, _id, idreceiver: artist._id };
      }
      return { user, artist, _id, idreceiver: user._id };
    });
    for (let index = 0; index < conversation.length; index++) {
      const message = await Message.findOne({
        conversation: conversation[index]._id,
      }).sort({ creation_date: -1 });
      conversations[index].message = message.message;
    }
    return res.json({
      msg: "Conversaciones Obtenidas",
      success: true,
      conversations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

module.exports = {
  getConversations,
};
