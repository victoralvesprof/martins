import clientes from "../models/Cliente.js";
import api from "../config/local.js";
import axios from "axios";

async function makeRequest() {

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

class ClienteController {

  static listarClientes = () => {
    console.log("chegou aq");

    //METODO 1
  //   // axios.get("http://localhost:3000/clientes", async (req, res) )
  //   //   .then((response) => doSomething(response.data))
  //   //   .catch((err) => {
  //   //     console.error("ops! ocorreu um erro" + err);
  //   //  });

    //METODO 2
  // api.get('/clientes')
  //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
      
    //METODO 3
    makeRequest();
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