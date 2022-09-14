import express from "express";
import clientes from "./clientesRoutes.js";
import cors from 'cors';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Drogaria Martins"})
  })
  app.use(
    express.json(),
    cors(),
    clientes
  )
}

export default routes