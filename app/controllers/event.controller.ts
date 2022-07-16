import { Event } from "../models";
import { Request, Response } from "express";

export const getById = async (req: Request, res: Response) => {
  Event.create({ name: "alireza" });
  const id = Number(req.params.id);
  const event = await Event.findByPk(id);
  if (!event) return res.status(404).send({ message: "not found" });
  return res.status(200).send(event);
};
