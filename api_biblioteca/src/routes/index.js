import express from "express";
import livro from "./livrosRoutes.js";
import autor from "./autorRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("Bem vindo a API!");
  });
  app.use(express.json(), livro, autor);
};

export default routes;
