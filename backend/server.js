import express from "express";
import cors from "cors";
import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// ES Modules fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares base
app.use(cors());
app.use(express.json());

// json-server
const router = jsonServer.router(
  path.join(__dirname, "db/db.json")
);

const middlewares = jsonServer.defaults();

// usar middlewares correctamente
app.use(middlewares);

// montar API
app.use("/api", router);

// arranque
app.listen(PORT, () => {
  console.log(`API simulada en http://localhost:${PORT}`);
});