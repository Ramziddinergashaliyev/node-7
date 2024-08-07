import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users, validateUser } from "../models/userSchema.js";
import dotenv from "dotenv";
dotenv.config();

class UsersController {
  async getProfile(req, res) {
    try {
      let user = await Users.findById(req.user._id);
      res.status(200).json({
        msg: "user registered succesfully",
        variant: "success",
        payload: user,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }
  async registerUser(req, res) {
    try {
      const { error } = validateUser(req.body);
      if (error)
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "error",
          payload: null,
        });

      const { username, password } = req.body;

      const existingUser = await Users.findOne({ username });
      if (existingUser)
        return res.status(400).json({
          msg: "User already exists.",
          variant: "error",
          payload: null,
        });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await Users.create({
        ...req.body,
        password: hashedPassword,
      });

      res.status(201).json({
        msg: "User registered successfully",
        variant: "success",
        payload: user,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }
  async loginUser(req, res) {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (!user)
      return res.status(400).json({
        msg: "Invalid username or password.",
        variant: "error",
        payload: null,
      });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({
        msg: "Invalid username or password.",
        variant: "error",
        payload: null,
      });

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      msg: "Logged in successfully",
      variant: "success",
      payload: token,
    });
  }
  async getAllUsers(req, res) {
    try {
      const users = await Users.find().sort({ createdAt: -1 });
      res.status(200).json({
        msg: "Users fetched successfully",
        variant: "success",
        payload: users,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      await Users.findByIdAndDelete(id);
      res.status(201).json({
        msg: "user is deleted",
        variant: "succes",
        payload: null,
      });
    } catch {
      res.status(500).json({
        msg: "server error",
        variant: "error",
        payload: null,
      });
    }
  }
  async updateProfile(req, res) {
    try {
      let profile = await Users.findOne({ _id: req.user._id });
      if (!profile) {
        return res.status(404).json({
          msg: "Profile not found.",
          variant: "error",
          payload: null,
        });
      }

      const existingProfile = await Users.findOne({
        username: req.body.username,
      });
      if (
        existingProfile &&
        existingProfile._id.toString() !== req.user._id.toString()
      ) {
        return res.status(400).json({
          msg: "Username already exists.",
          variant: "error",
          payload: null,
        });
      }

      if (!req.body.password) {
        req.body.password = profile.password;
      }

      const newProfile = await Users.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      });

      res.status(200).json({
        msg: "Profile is updated",
        variant: "success",
        payload: newProfile,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }
  async updateUser(req, res) {
    try {
      const { id } = req.params;

      const existingUser = await Users.findOne({ username: req.body.username });
      if (existingUser && id !== existingUser._id.toString())
        return res.status(400).json({
          msg: "User already exists.",
          variant: "error",
          payload: null,
        });

      req.body.password = existingUser.password;

      let user = await Users.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({
        msg: "user updated",
        variant: "success",
        payload: user,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }
  async editPassword(req, res) {
    try {
      const user = await Users.findById(req.user._id);
      if (!user) {
        return res.status(404).json({
          msg: "Foydalanuvchi topilmadi.",
          variant: "error",
          payload: null,
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({
          msg: "Eski parol noto'g'ri.",
          variant: "error",
          payload: null,
        });
      }

      if (!req.body.newPassword || req.body.newPassword.length < 8) {
        return res.status(400).json({
          msg: "Yangi parol kamida 8 ta belgidan iborat bo'lishi kerak.",
          variant: "error",
          payload: null,
        });
      }

      const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
      user.password = newPasswordHash;

      await user.save();

      res.status(200).json({
        msg: "Parol muvaffaqiyatli yangilandi",
        variant: "success",
        payload: null,
      });
    } catch (error) {
      console.error("Parolni yangilashda xato:", error);

      res.status(500).json({
        msg: "Server xatosi",
        variant: "error",
        payload: null,
      });
    }
  }
}

export default new UsersController();
