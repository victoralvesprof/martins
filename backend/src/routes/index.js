import express from "express";
import clientes from "./clientesRoutes.js";
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5000', 
  'http://127.0.0.1:5000'
];

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Drogaria Martins"})
  })
  app.use(
    express.json(),
    cors({
      optionsSuccessStatus: 200,
      origin: function(origin, callback) {
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){ 
          const msg = 'A política CORS para este site não ' + 
                    'permite acesso da Origem especificada.'; 
          return callback(new Error(msg), false); 
        }
        return callback(null, true);
      }
    }),
    clientes
  );
}

export default routes