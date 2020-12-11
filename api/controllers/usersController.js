const chalk = require('chalk');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function usersController(User) {
  async function get(req, res, next){
    try{
        const users = await User.find();
        res.status(200).json({
          count: users.length,
          users
        });

    }
    catch(err){
      console.log(err);
      res.status(500).json({error: err});
    }
  }

  async function signUp(req, res, next){
    try{
      //check for email uniqueness
      const availableUser = await User.find({ email: req.body.email });
      if(availableUser.length > 0){
        return res.status(409).json({
          message: 'Email already taken by another user'
        });
      }

      if(!req.body.password){
        return res.status(409).json({
          message: 'Password is required'
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fullName: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      });
      await user.save();
      console.log(user);
      res.status(201).json({
        message: 'User was created successfully',
        createdCategory: {
          user: user
        }
      });
    }
    catch(err) {
      console.log(err);
      res.status(500).json({
        error: err.message
      });
    };
    
    
  }

  async function updateUser(req, res, next){
    
    const id = req.params.categoryId;
    const update = { name: req.body.name, description: req.body.description };
    
    try{
      const catg = await Category.findById(id);
      // return res.send(catg);
      if(!catg){
        return res.status(404).json({
          error: "Category not found"
        });
      }
      
      const category = await Category.findOneAndUpdate(id, {$set: {name: req.body.newName, description: req.body.newDescription}}, {
        new: true
      });
      
      res.status(201).json({
        message: "Category updated successfully",
        name: category.name, // 'Jean-Luc Picard'
        description: category.description
      });  
    }
    catch(err){
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    }
  };

  async   function getUserById(req, res, next){
    const id = req.params.userId;
    try{
     
      const user = await User.findById(id);
      // .select("product quantity _id")
      // const user = populate('user');
    
        console.log("From database", user);
        if(user){
          res.status(200).json({
            user: user,
            request: {
              type: 'GET',
              description: 'Get all the users', 
              url: 'http://localhost:4000/api/users/'
            }
          });
        }
        else{
          res.status(404).json({
            error: "User not found"
          });

        }
    }
    catch(err){
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    }
  };

  async function deleteUser(req, res, next){
    const id = req.params.userId;
    try{
        const user = await User.findById(id);
        if(!user){
          return res.status(404).json({
            error: "User does not exist"
          });
        }
        await user.remove();
        res.status(200).json({
          message: "User deleted successfully",
          request: {
            type: 'POST',
            description: 'Create new user', 
            url: 'http://localhost:4000/api/users/',
            body: {fullname: 'String, required',
            username: 'String, required',
            email: 'String, required, unique',
            password: 'String, required',
          }
          }
        });
    }
    catch(err) {
      console.log(err);
      res.status(500).json({
        error: err.message
      });
    };
  }



  return {
    get,
    signUp,
    updateUser,
    getUserById,
    deleteUser
  };
}

module.exports = usersController;