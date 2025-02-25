import express from 'express';

import createRoutes from '../src/infra/routes/routes';

async function startServer() {
    const app = express();
    app.use(express.json());

    const router = await createRoutes(); 
    app.use(router); 

    app.listen(3000, () => {
        console.log(" Servidor rodando na porta 3000");
    });
}

startServer();