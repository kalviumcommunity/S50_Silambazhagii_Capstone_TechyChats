const express = require("express");
const router = express.Router();
const userModel = require("../Schema/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sec = process.env.JWT_SECRET;
const userSchema = require("./userSchema");

const generateToken = (user) => {
  return jwt.sign({ user }, sec, { expiresIn: "1h" });
};

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Token is not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ error: "Forbidden: Failed to authenticate token", error });
  }
};

// Read all users
router.get("/", async (req, res) => {
  try {
    const data = await userModel.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

// Read a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

// Validate token
router.post("/users/tokenvalidate", verifyToken, (req, res) => {
  res.status(200).json({ valid: true, user: req.decoded });
});

// Create a new user
router.post("/createnew", async (req, res) => {
  try {
    // Validate request body against userSchema
    const validationResult = userSchema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const hashedRepeatPassword = await bcrypt.hash(
      req.body.repeat_password,
      10
    );
    req.body.repeat_password = hashedRepeatPassword;

    const data = await userModel.create(req.body);

    const token = generateToken(data);

    res.status(201).json({ userData: data, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    console.log(data)

    // Find the user by ID and update it with the data from req.body
    const updatedUser = await userModel.findByIdAndUpdate(userId, data, { new: true });
    
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(updatedUser);
    console.log(updatedUser)
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    // Validate request body against userSchema
    const validationResult = userSchema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

// Delete a user by ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
