import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
  constructor(mensagem = "Pagina nao encontrada", status = 404) {
    super(mensagem, status);
  }
}

export default NaoEncontrado;
