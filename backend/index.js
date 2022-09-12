const express = require('express'); //variavel que recebe parametros do Express
const server = express(); //variavel armazena uma aplicação Express
const cors = require('cors');
server.use(express.json()); //faz com que o express entenda JSON
server.use(cors());
const clientes = require("../frontend/src/assets/mocks/data.mock.json"); //vai armazenar os clientes

server.get('/clients', (req, res) => 
{
    return res.json(clientes);
});

server.get('/client/:cpf', (req, res) => {
    const { cpf } = req.params;
    const index = clientes.findIndex(element => element.cpf === cpf);

    return res.json(clientes[index]);
});
    
server.post('/add-client', (req, res) => {
    clientes.push(req.body);

    return res.json({status: "deu bom"}); // retorna a informação da variável clientes
});

server.put('/edit-client', (req, res) => {
    const { cpf } = req.body; // recupera o index com os dados
    
    clientes[clientes.findIndex(element => element.cpf === cpf)] = req.body;
    
    return res.json(clientes);
}); // retorna novamente os clientes atualizados após o update

server.delete('/client/:cpf', (req, res) => {
    const { cpf } = req.params; // recupera o index com os dados
    
    clientes.splice(clientes.findIndex(element => element.cpf === cpf), 1); // percorre o vetor até o index selecionado e deleta uma posição no array
    
    return res.send();
}); // retorna os dados após exclusão

server.listen(3000);