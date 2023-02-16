import express, { Application, Response, Request } from "express";
import authorRouter from "./router/authorRouter";

const port: number = 2002;

const app: Application = express();

require("./config/db");

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

app.use("/api", authorRouter);

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
