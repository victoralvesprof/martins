import express from "express";
import clientes from "./roteador.js";
import cors from 'cors';

const routes = (app) => {
  app.use(
    express.json(),
    cors(),
    clientes
  )
}

export default routes