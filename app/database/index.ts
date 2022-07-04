import { Event } from "../models";
const isDev = process.env.NODE_ENV === "development";

export default () => {
  //
  Event.sync({ force: isDev, alter: isDev });
};
