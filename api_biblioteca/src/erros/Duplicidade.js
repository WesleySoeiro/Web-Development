import { autor } from "../models/Autor.js";
import livro from "../models/Livros.js";
import ErroBase from "./ErroBase.js";

class Duplicatas extends ErroBase {
  constructor(mensagem = "Já existe um registro no sistema", status = 409) {
    super(mensagem, status);
  }

  async confereExistencia(valor) {
    try {
      console.log(valor, "aqui");

      const confereAutorExistencia = await autor.findOne({
        nome: valor.nome,
      });

      const confereLivroExistencia = await livro.findOne({
        titulo: valor.titulo,
      });

      if (confereAutorExistencia || confereLivroExistencia) {
        return true;
      }
      return false;
    } catch (erro) {
      console.log(erro);
    }
  }
}

export default Duplicatas;
