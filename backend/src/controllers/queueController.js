import QueueDao from "../dao/queueDao.js";

class QueueController {

  static reduzirEstoque = async (req, res) => {
    await QueueDao.stockReduction(req, res);
  }
}

export default QueueController