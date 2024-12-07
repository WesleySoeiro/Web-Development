import Duplicatas from "../erros/Duplicidade.js";

function confereExistencia(req, res, next) {
  const duplicatas = new Duplicatas();
  next(duplicatas);
}

export default confereExistencia;
