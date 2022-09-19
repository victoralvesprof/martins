import clientes from "../models/Cliente.js";
import api from "../config/local.js";
import axios from "axios";

async function metodo3() {
  const config = {
      method: 'get',
      url: 'http://localhost:3000/clientes',
      headers: {
        'User-Agent': 'Axios - console app',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        'Content-Type': 'application/json; charset=utf-8',
        'ETag': `W/"e26-lchCs6o6uvrNdfq6rONJlBa7gw4"`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS'
      }
  };
  let res = await axios(config);
  console.log("header:", res.data);
}

function metodo2() {
  api.get('/clientes')
    .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

function metodo1() {
  axios.get("http://localhost:3000/clientes", async (req, res) )
    .then((response) => doSomething(response.data))
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
}

class ClienteController {

  static listarClientes = () => {
    console.log("chegou aq");

    //METODO 1
    // metodo1();

    //METODO 2
    // metodo2();
      
    //METODO 3
    metodo3();
  }

  static listarClientePorId = () => {
    
  }

  static cadastrarCliente = (req, res) => {
    
  }

  static atualizarCliente = (req, res) => {
    
  }

  static excluirCliente = (req, res) => {
    
  }
}

export default ClienteController