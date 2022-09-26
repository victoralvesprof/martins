import api from "../config/local.js";

class ClienteController {

  static listarClientes = async (req, res) => {
    try {
      const response = await api.get("/clientes");
      res.send(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  static listarClientePorId = async (req, res) => {
    try {
      const response = await api.get(`/clientes/${req.params.id}`);
      res.send(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  static cadastrarCliente = async (req, res) => {
    try {
      const response = await api.post("/clientes", req.body);
      res.send(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  static atualizarCliente = async (req, res) => {
    try {
      const response = await api.put(`/clientes/${req.params.id}`, req.body);
      res.send(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  static excluirCliente = async (req, res) => {
    try {
      const response = await api.delete(`/clientes/${req.params.id}`);
      res.send(response.data);
    } catch (err) {
      console.error(err);
    }
  }
}

export default ClienteController