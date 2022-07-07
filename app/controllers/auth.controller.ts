import { Request, Response } from "express";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/auth.config";
import { User, Role } from "../models";
import { UserInput } from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, roles } = req.body;
    const payload: UserInput = {
      username: username,
      password: bcrypt.hashSync(password, 8),
    };
    const user: any = await User.create(payload);
    await user.setRoles(roles || [1]);
    res.send({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user: any = await User.findOne({ where: { username } });

  if (!user) return res.status(404).send({ message: "User Not found." });

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid)
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });

  var token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 2592000,
  });

  const roles = user.getRoles().map((role) => role.name.toUpperCase());

  res.status(200).send({
    id: user.id,
    username: user.username,
    email: user.email,
    roles: roles,
    accessToken: token,
  });
};
