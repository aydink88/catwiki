import path from "path"
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { catRoutes } from './routes.js';
import { shouldUpdateDatabase } from "./should-update.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import morgan from "morgan";

dotenv.config();

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    err && console.log(err);
  }
);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
// app.use(morgan("dev"));

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(shouldUpdateDatabase)
app.use('/api', catRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
);

const errorHandler = (err, req, res, _next) => {
  let error = { ...err };

  error.message = err.message;

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server is running on ' + port);
});
