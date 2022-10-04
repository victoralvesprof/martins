import clientes from "../models/Cliente.js";
import ClienteDao from "../dao/clienteDao.js";

class ClienteController {

  static listarClientes = (req, res) => {
    ClienteDao.listarTodosClientes(req, res);
  }

  static listarClientePorId = (req, res) => {
    ClienteDao.listarUnicoCliente(req, res);
  }

  static cadastrarCliente = (req, res) => {
    ClienteDao.addCliente(req, res);
  }

  static atualizarCliente = (req, res) => {
    ClienteDao.atualizarCliente(req, res);
  }

  static excluirCliente = (req, res) => {
    ClienteDao.deletarCliente(req, res);
  }
}

export default ClienteController