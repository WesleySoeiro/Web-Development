import livro from "../models/Livros.js";
import mongoose from "mongoose";
import NaoEncontrado from "../erros/404.js";
import Duplicatas from "../erros/Duplicidade.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const listaLivros = await livro.find({}).populate("autor").exec();
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    const novoLivro = req.body;

    const objMinusculo = {};

    Object.entries(novoLivro).forEach(([chave, valor]) => {
      objMinusculo[chave.toLowerCase()] =
        typeof valor === "string" ? valor.toLowerCase() : valor;
    });

    const duplicatas = new Duplicatas();
    const confereExistencia = await duplicatas.confereExistencia(objMinusculo);

    if (!confereExistencia) {
      try {
        let livroCriado = await livro.create(objMinusculo);

        res.status(201).json({
          message: "Livro cadastrado com sucesso",
          livro: livroCriado,
        });
      } catch (erro) {
        next(erro);
      }
    } else {
      next(new Duplicatas("Já existe um registro no sistema", 409));
    }
  };

  static listarLivrosPorID = async (req, res, next) => {
    const id = req.params.id;

    try {
      const id = req.params.id;

      if (mongoose.Types.ObjectId.isValid(id)) {
        const livroEncontrado = await livro.findById(id);
        if (livroEncontrado) {
          res.status(200).json({ livroEncontrado });
        } else {
          next(new NaoEncontrado("Livro nao encontrado"));
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

  static atualizarLivro = async (req, res, next) => {
    const obj = req.body;
    const objMinusculo = {};

    Object.entries(obj).forEach(([chave, valor]) => {
      objMinusculo[chave.toLowerCase()] =
        typeof valor === "string" ? valor.toLowerCase() : valor;
    });

    try {
      const id = req.params.id;
      if (mongoose.Types.ObjectId.isValid(id)) {
        const livroEncontrado = await livro.findByIdAndUpdate(id, objMinusculo);

        if (livroEncontrado) {
          res.status(200).json({ message: "Livro atualizado com sucesso" });
        } else {
          next(new NaoEncontrado("Livro nao encontrado"));
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

  static deletarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      if (mongoose.Types.ObjectId.isValid(id)) {
        const livroEncontrado = await livro.findByIdAndDelete(id);

        if (livroEncontrado) {
          res.status(200).json({ message: "Livro deletado com sucesso" });
        } else {
          next(new NaoEncontrado("Livro nao encontrado"));
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

  static listarLivrosPorEditora = async (req, res, next) => {
    const editora = req.query.editora.toLowerCase();
    try {
      const livrosPorEditora = await livro.find({ editora });
      res.status(200).json({ livrosPorEditora });
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
