import express from "express";
import AutorController from "../controllers/autorController.js";

const routes = express.Router();

routes.get("/autor", AutorController.listarAutores);
routes.post("/autor/", AutorController.cadastrarAutor);
routes.get("/autor/:id", AutorController.listarAutorPorID);
routes.put("/autor/:id", AutorController.atualizarAutor);
routes.patch("/autor/:id", AutorController.atualizarAutor);
routes.delete("/autor/:id", AutorController.deletarAutor);

export default routes;
