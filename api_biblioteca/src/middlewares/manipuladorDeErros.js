import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErrosValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/404.js";
import Duplicatas from "../erros/Duplicidade.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErrosValidacao(erro).enviarResposta(res);
  } else if (erro instanceof NaoEncontrado) {
    new NaoEncontrado(erro).enviarResposta(res);
  } else if (erro instanceof Duplicatas) {
    new Duplicatas(erro).enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
