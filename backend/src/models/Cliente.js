import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema([
  {
    _id: {type: String},
    nome: {type: String, required: true},
    endereco: {type: String, required: true},
    cpf: {type: String, required: true},
    rg: {type: String, required: true},
    email: {type: String, required: true},
    sexo: {type: String, required: true},
    items: {type: [
        {
            descricao: {type: String, required: true},
            quantidade: {type: Number, required: true},
            data: {type: Date, required: true},
            valor: {type: Number, required: true}
        }
    ]},
    divida: {type: Number},
    aVer: [
        {
            data: {type: Date, required: true},
            valor: {type: Number, required: true}
        }
    ],
    abatido: {type: Number}
  }]
);

const clientes = mongoose.model('clientes', clienteSchema);

export default clientes;