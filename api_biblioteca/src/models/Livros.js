import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "O título é obrigatório"],
      unique: false,
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O ID do autor é obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "O nome da editora é obrigatório"],
    },
    preco: { type: Number, required: [true, "O preço é obrigatório"] },
    paginas: {
      type: Number,
      required: [true, "O número de paginas é obrigatório"],
    },
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
