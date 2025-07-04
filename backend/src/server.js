import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import notesRoutes from "./routes/notesRouts.js"; // your existing
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(rateLimiter);
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/analytics", analyticsRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT||5001, () => console.log("Server listening"));
});
