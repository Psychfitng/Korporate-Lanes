const Lane = require("../models/Lane");

const Organization = require("../models/Organization");

const Chat = require("../models/Chat");

const { validationResult } = require("express-validator");

const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");

const LaneUser = require("../models/LaneUser");

const { findById } = require("../models/LaneUser");

const { findByIdAndRemove } = require("../models/Organization");

let transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "info@irespond.africa", // generated ethereal user
    pass: "Insidelife@1", // generated ethereal password
  },
});

exports.createLane = async (req, res) => {
  const org = await Organization.findById(req.query.companyId);
  if (org) {
    const lane = new Lane({
      name: org.name,
      logo: org.organization_logo,
      companyId: org.id,
      chat: [],
    });

        lane.save().then(data => {
        org.lane = data.id;
        org.save();
        res.status(201).json({ success: true, message: data });
      }).catch(err => res.status(400).json({ message: err.message }));
   
  }
};

exports.updateLane = (req, res) => {
  res.send("I aint ready yet");
};

// chat feeds

exports.getChats = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  const name = req.body.name;
  const lane = req.body.name;
  try {
    const totalItems = await Lane.find({ name }).chats.countDocuments();
    const posts = await Chat.find({ lane })
      .populate("creator")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetched chats successfully.",
      posts: posts,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = req.body.imageUrl;
  const content = req.body.content;
  const chat = new Chat({
    content: content,
    imageUrl: imageUrl,
    creator: req.body.userId,
    lane: req.body.laneId,
  });
  try {
    await chat.save();
    const user = await LaneUser.findById(req.body.userId);
    const lane = await Lane.findById(req.body.laneId);
    lane.chats.push(chat);
    await lane.save();
    io.getIO().emit("chats", {
      action: "create",
      post: { ...chat, creator: { id: req.body.userId, name: user.name } },
    });
    res.status(201).json({
      message: "Chat created successfully!",
      message: chat,
      creator: { id: user.id, name: user.name },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const chatId = req.query.chatId;
  const chat = await Chat.findById(chatId);
  try {
    if (!chat) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Post fetched.", post: chat });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  const chatId = req.query.chatId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  try {
    const chat = await Chat.findById(chatId).populate("creator");
    if (!chat) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    if (chat.creator.id.toString() !== req.body.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    chat.imageUrl = req.body.imageUrl;
    chat.content = req.body.content;
    const result = await chat.save();
    io.getIO().emit("posts", { action: "update", post: result });
    res.status(200).json({ message: "Post updated!", post: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.query.chatId;
  try {
    const post = await Chat.findById(postId);

    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }
    await Chat.findByIdAndRemove(postId);

    const user = await LaneUser.findById(req.userId);
    user.posts.pull(postId);
    await user.save();
    io.getIO().emit("posts", { action: "delete", post: postId });
    res.status(200).json({ message: "Deleted post." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

  exports.deleteLane = (req, res) => {
    findByIdAndRemove(req.query.laneId)
      .then((data) => res.status(200).json("Lane deleted"))
      .catch((err) => res.status(404).json(err.message));
  };

  exports.getLane = async (req, res) => {
    try{
      const lane = await findById(req.query.laneId);
      res.status(200).json({ success: true, data: lane });
    }
    catch(err){
      res.status(400).json({ success: false, data: err.message });
    }   
  };

  exports.getLaneByName = async (req, res) => {
    try{
      const name = req.query.laneName;
      const lane = await find({ name });
      res.status(200).json({ success: true, data: lane });
    }
    catch(err){
      res.status(400).json({ success: false, data: err.message });
    }   
  };

  exports.getAllLanes = async (req, res) => {
    
    try {
      const lanes = await Lane.find();
      res.status(200).json(lanes);
    } catch (error) {
      res.status(400).json(error.message);
    }

    
  }