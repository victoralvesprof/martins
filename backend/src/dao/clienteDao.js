import clientes from "../models/Cliente.js";

class ClienteDao {

    static listarTodosClientes = async (req, res) => {
        try {
            await clientes.find()
            .then(allClientes => res.status(200).json(allClientes))
            .catch(err => res.status(500).json(err))
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static listarUnicoCliente = async (req, res) => {
        const id = req.params.id;
        
        try {
            await clientes.findById(id)
            .then((clientesResultado) => res.status(200).send(clientesResultado))
            .catch((err) => res.status(400).send({ message: `${err.message} - ID do Cliente não localizado.` }))
        } catch (err) {
            res.status(500).json(err);
            res.status(400).json(err);
        }
    }

    static addCliente = async (req, res) => {
        try{
            const cliente = new clientes(req.body);
    
            await cliente.save()
            .then((savedClient) => {
                console.log("retornou salvo: ", savedClient);
                res.status(201).json({ msg: 'Registro criado com sucesso!' });
            })
            .catch((err) => {
                console.log("erro ao salvar: ", err);
                res.status(500).json({ msg: err.message });
            })
        } catch(err) {
            console.log("erro catch de fora salvar: ", err);
            res.status(500).json({ msg: err.message });
        }
    }

    static atualizarCliente = async (req, res) => {
        try{
            const id = req.params.id;
            const updateClient = req.body;
    
            await clientes.findOneAndUpdate({_id: id}, { $set: updateClient }, {new: true})
            .then((updateClient) => {
                console.log("retornou update: ", updateClient);
                res.status(200).json({ msg: 'Registro editado com sucesso!' });
            })
            .catch((err) => {
                console.log("error update: ", err);
                res.status(500).json({ msg: err.message });
            })
        } catch(err) {
            console.log("error catch de fora update: ", err);
            res.status(500).json({ msg: err.message });
        }
    }

    static deletarCliente = async (req, res) => {
        const id = req.params.id;

        try {
            await clientes.findByIdAndDelete(id)
            .then((deleteProduct) => {
                console.log(deleteProduct);
                res.status(200).json({ msg: 'Registro removido com sucesso!' });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: error.message });
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}

export default ClienteDao;