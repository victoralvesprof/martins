const express = require('express'); //variavel que recebe parametros do Express
const server = express(); //variavel armazena uma aplicação Express
const cors = require('cors'); //importa cors pra remover erro
server.use(express.json()); //faz com que o express entenda JSON
server.use(cors());
const clientes = require("../frontend/src/assets/mocks/data.mock.json"); //vai armazenar os clientes
const port = process.env.PORT || 3000;

server.get('/clients', (req, res) => 
{
    return res.json(clientes).status(200).send('Clientes disponíveis para consulta');
});

server.get('/client/:cpf', (req, res) => {
    const { cpf } = req.params;
    const index = clientes.findIndex(element => element.cpf === cpf);

    return res.json(clientes[index]).status(200).send('Cliente consultado com sucesso');
});
    
server.post('/add-client', (req, res) => {
    clientes.push(req.body);

    return res.json(clientes).status(201).send('Cliente foi cadastrado com sucesso'); 
});

server.put('/edit-client', (req, res) => {
    const { cpf } = req.body; 
    
    clientes[clientes.findIndex(element => element.cpf === cpf)] = req.body;
    
    return res.json(clientes).status(200).send('Dados do cliente atualizados com sucesso');
}); 

server.delete('/client/:cpf', (req, res) => {
    const { cpf } = req.params; 
    
    clientes.splice(clientes.findIndex(element => element.cpf === cpf), 1);
    
    return res.json(clientes).status(200).send('Cliente foi removido com sucesso');
});

server.listen(port, () => {
    console.log(`servidor escutando em http://localhost:${port}`)
});