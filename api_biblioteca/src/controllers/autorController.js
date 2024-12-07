import { autor } from "../models/Autor.js";
import NaoEncontrado from "../erros/404.js";
import mongoose from "mongoose";
import Duplicatas from "../erros/Duplicidade.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      next(erro);
    }
  }

  static cadastrarAutor = async (req, res, next) => {
    const novoAutor = req.body;

    const objMinusculo = {};

    Object.entries(novoAutor).forEach(([chave, valor]) => {
      objMinusculo[chave.toLowerCase()] =
        typeof valor === "string" ? valor.toLowerCase() : valor;
    });

    const duplicatas = new Duplicatas();
    const confereExistencia = await duplicatas.confereExistencia(objMinusculo);
    if (!confereExistencia) {
      try {
        let autorCriado = await autor.create(objMinusculo);

        res.status(201).json({
          message: "Autor cadastrado com sucesso",
          autor: autorCriado,
        });
      } catch (erro) {
        console.log(erro);

        next(erro);
      }
    } else {
      console.log("caiu aqui");
      next(new NaoEncontrado("Já existe um registro no sistema", 409));
    }
  };
  static get cadastrarAutor() {
    return AutorController._cadastrarAutor;
  }
  static set cadastrarAutor(value) {
    AutorController._cadastrarAutor = value;
  }

  static listarAutorPorID = async (req, res, next) => {
    const id = req.params.id;

    try {
      const id = req.params.id;

      if (mongoose.Types.ObjectId.isValid(id)) {
        const autorEncontrado = await autor.findById(id);
        if (autorEncontrado) {
          res.status(200).json({ autorEncontrado });
        } else {
          next(new NaoEncontrado("autor nao encontrado"));
        }
      } else {
        res.status(400).send({
          mensagem: "Um ou mais dados inseridos estão Incorretos",
          status: 400,
        });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    const obj = req.body;
    const objMinusculo = {};

    Object.entries(obj).forEach(([chave, valor]) => {
      objMinusculo[chave.toLowerCase()] =
        typeof valor === "string" ? valor.toLowerCase() : valor;
    });

    try {
      const id = req.params.id;
      if (mongoose.Types.ObjectId.isValid(id)) {
        const autorEncontrado = await autor.findByIdAndUpdate(id, objMinusculo);

        if (autorEncontrado) {
          res.status(200).json({ message: "Autor atualizado com sucesso" });
        } else {
          next(new NaoEncontrado("ID nao encontrado"));
        }
      } else {
        res.status(400).send({
          mensagem: "Um ou mais dados inseridos estão Incorretos",
          status: 400,
        });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static deletarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      if (mongoose.Types.ObjectId.isValid(id)) {
        const autorEncontrado = await autor.findByIdAndDelete(id);

        if (autorEncontrado) {
          res.status(200).json({ message: "Autor deletado com sucesso" });
        } else {
          next(new NaoEncontrado("ID nao encontrado"));
        }
      } else {
        res.status(400).send({
          mensagem: "Um ou mais dados inseridos estão Incorretos",
          status: 400,
        });
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
