import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    const menssagemErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");
    super(`A requisição falhou -> ${menssagemErro}`);
  }
}

export default ErroValidacao;
