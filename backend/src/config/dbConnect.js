import mongoose from "mongoose"

mongoose.connect("mongodb+srv://vhcalves:Root_1234@cluster0.3hzro9z.mongodb.net/martins-clientes");

let db = mongoose.connection;

export default db;
