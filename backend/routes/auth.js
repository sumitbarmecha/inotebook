const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const { exists } = require('../models/User');
const JWT_SECRET = 'sumitisaGoodB%oi';
const fetchuser = require('../middleware/fetchuser')
//ROUTE 1: create a User using :POST "/api/create user/".Doesnt require auth
router.post('/createuser',
  [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a password with minimum 7 characters').isLength({ min: 5 })
  ],
  async (req, res) => {

    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     
      return res.status(400).json({ errors: errors.array() }); 
    }
    try {
      // check whether the user with same email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {

        return res.status(400).json({ errors: "user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)
      // creating a new user   
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
      // .then(user => res.json(user)).catch(err=>{console.log(err)
      // res.json({error:'please enter a unique value',message:err.message})});
      res.json({msg, authtoken })
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error ocured")
    }
  })

//ROUTE2: authenticate a User using POST "/pi/auth/login" .  no login required
router.post('/login'
  , [
    // body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
  ]
  , async (req, res) => {
    let msg = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg, error: "please try to login with correct credentials" })
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ msg, error: "please try to login with correct credentials" })
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      msg=true
      res.json({ msg, authtoken })
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error")
    }
  })

//ROUTE3 : GET LOGGED IN USER DETAILS a User using POST "/pi/auth/getuser" .   login required
router.post('/getuser',fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})
module.exports = router