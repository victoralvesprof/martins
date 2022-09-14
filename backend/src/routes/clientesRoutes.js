import express from "express";
import ClienteController from "../controllers/clientesController.js";
import cors from 'cors';

const router = express.Router();
router.use(cors());

router
  .get("/clientes", ClienteController.listarClientes)
  .get("/clientes/:id", ClienteController.listarClientePorId)
  .post("/clientes", ClienteController.cadastrarCliente)
  .put("/clientes/:id", ClienteController.atualizarCliente)
  .delete("/clientes/:id", ClienteController.excluirCliente)

export default router;