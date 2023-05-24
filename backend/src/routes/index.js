import express from "express";
import clientes from "./clientesRoutes.js";
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5000', 
  'http://127.0.0.1:5000'
];

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Drogaria Martins"})
  })
  app.use(
    express.json(),
    clientes
  );
}

export default routes