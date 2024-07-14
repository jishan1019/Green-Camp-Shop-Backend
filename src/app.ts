import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import cookeParser from "cookie-parser";
import httpStatus from "http-status";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandeler";

const app = express();

//parser
app.use(express.json());
app.use(cors());
app.use(cookeParser());
app.use(express.text());

//router
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Server is running....!");
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
