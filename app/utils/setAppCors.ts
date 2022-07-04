import cors from "cors";

export default (app) => {
  const port = process.env.PORT;
  const corsOptions = {
    origin: `https://localhost:${port}`,
  };
  app.use(cors(corsOptions));
};
