import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import Producer from "../producer.js";

const producer = new Producer();

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
});

const app = express();
app.use(express.json());
app.use(bodyParser.json("application/json"));

app.post("/sendLog", async(req, res, next) => {
  await producer.publishMessage(req.body.logType, req.body.message);
  res.send();
});

routes(app);

export default app