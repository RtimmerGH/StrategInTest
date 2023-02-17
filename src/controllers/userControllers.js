const User = require("../models/userModel");

const add = async (req, res) => {
    const user = new User(req.body);
    try {
      const saveUser = await user.save();
      res.status(201).send(saveUser);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  const login = async (req, res) => {
    try {
      const user = await User.findUser(req.body.email, req.body.password);
      const authToken = await user.generateAuthToken();
      res.send({ user, authToken });
    } catch (error) {
      res.status(400).send("problème de connexion");
    }
  };

  const browse = async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const read = async (req, res) => {
    try {
    if (req.params.id !== req.user._id.toString() ) {
        res.sendStatus(403);
        } else {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send("User not found!");
      res.send(user);
        }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const edit = async (req, res) => {  
    if (req.body.password) {
      delete req.body.password;
    } 
    try {
      if (req.params.id !== req.user._id.toString() ) {
        res.sendStatus(403);
        } else {   
      const user = await User.findOneAndUpdate({_id:req.params.id},req.body,{returnDocument:'after'});  
      if (!user) return res.status(404).send("User not found!");
      res.send(user);
        }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const destroy = async (req, res) => {
    try {
      if (req.params.id !== req.user._id.toString() ) {
        res.sendStatus(403);
        } else {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).send("User not found!");
      res.send(user);
        }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  module.exports = {    
    add, 
    login,  
    browse, 
    read,
    edit,
    destroy,
  };
  