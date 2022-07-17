import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/auth.config";
import { User, Role } from "../models";
import { UserInput } from "../models/user.model";
import * as validations from "../validations";

export const register = async (req: Request, res: Response) => {
  const isValid: boolean = await validations.validate(
    validations.register,
    req,
    res
  );
  if (!isValid) return;

  try {
    const { email, password, roles } = req.body;
    const payload: UserInput = {
      email: email,
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
  const { email, password } = req.body;
  const user: any = await User.findOne({ where: { email } });

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

  let roles = await user.getRoles();
  roles = roles.map((role) => role.name.toUpperCase());

  res.status(200).send({
    id: user.id,
    email: user.email,
    roles: roles,
    accessToken: token,
  });
};
