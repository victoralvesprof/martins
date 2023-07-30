import mongoose from "mongoose";

const estoqueSchema = new mongoose.Schema([
  {
    _id: {type: String, required: true},
    quantidade: {type: Number, required: true}
  }]
);

const estoques = mongoose.model('estoques', estoqueSchema);

export default estoques;