import express from "express";
import clientes from "./roteador.js";
import cors from 'cors';
import axios from "axios";

const routes = (app) => {
  app.use(
    express.json(),
    cors(),
    axios,
    clientes
  )
}

export default routes