import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";
import confereExistencia from "./middlewares/confereExistencia.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexao = await dbConnect();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("conectado ao banco de dados");
});

const app = express();

app.use(express.json());
routes(app);
app.use(confereExistencia);
app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;
