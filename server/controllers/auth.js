import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
/* REGISTER USER */

export const register = async (req, res) => {
    try {
        const {
            pseudo,
            email,
            password,
        } = req.body;
        const salt = await bcrypt.genSalt();
        const PasswordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            pseudo,
            email,
            password: PasswordHash,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err.message);
    }
};


/* LOGIN USER */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "Cet utilisateur n'existe pas"});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "l'identifiant ou le mot de passe est incorrect" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json(err.message);
    } 
}