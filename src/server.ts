import express from 'express'
import dotenv from 'dotenv'
import {testDBConnection} from './config/database'
import authRoutes from './routes/authRoutes'
import projectRoutes from './routes/projectRoutes'
import submissionRoutes from './routes/submissionRoutes'

dotenv.config()


const app = express()
app.use(express.json());
const PORT = process.env.PORT || 5000;

const startServer = async () => {

    await testDBConnection();
    
    app.use('/api/users', authRoutes )
    app.use('/api/projects', projectRoutes);
    app.use('/api/projects/submissions', submissionRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();
