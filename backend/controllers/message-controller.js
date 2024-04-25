const Message = require('../models/message');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({
      messages: messages.map((message) => message.toObject({ getters: true })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMessage = async (req, res) => {
  const newMessage = new Message({
    message: req.body.message,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
