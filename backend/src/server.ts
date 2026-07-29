import "dotenv/config";

import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();

const port = Number(process.env.PORT) || 5000;

const allowedOrigins = (
  process.env.FRONTEND_URL ?? "http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim());

app.set("trust proxy", 1);

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not permitted by CORS."));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json({ limit: "250kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get("/", (_request: Request, response: Response) => {
  response.json({
    success: true,
    message: "GOEARC beta API is running.",
  });
});

app.get("/api/health", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    service: "GOEARC beta API",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use((_request: Request, response: Response) => {
  response.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    console.error(error);

    response.status(500).json({
      success: false,
      message: "An unexpected server error occurred.",
    });
  },
);

app.listen(port, () => {
  console.log(`GOEARC API running at http://localhost:${port}`);
});