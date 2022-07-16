import cors from "cors";

export default (app) => {
  const port = process.env.PORT;
  const corsOptions = {};
  app.use(cors(corsOptions));
};
