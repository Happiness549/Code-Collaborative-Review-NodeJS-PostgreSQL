import express from 'express'
import dotenv from 'dotenv'
import {testDBConnection} from './config/database'
import authRoutes from './routes/authRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

const startServer = async () => {

    await testDBConnection();
    app.use(express.json());
    app.use('/api/users', authRoutes )
    app.use('/api', authRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();
