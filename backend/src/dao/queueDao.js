import estoques from "../models/Estoque.js";
import Producer from "../../producer.js";

const producer = new Producer();

class QueueDao {
    static stockReduction = async (req, res) => {
        await producer.publishMessage(req.body.logType, req.body.message);
        
        res.send();
    }
}

export default QueueDao;