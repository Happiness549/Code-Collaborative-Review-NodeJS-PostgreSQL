import {Pool} from 'pg'
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

export const query = (text: string, param?: any[]) => pool.query(text,param)

export const testDBConnection = async () => {
    try{
        const client = await pool.connect();
        console.log('DATABASE connection successful');
        client.release();
    }catch(error){
        console.error('Unable to connect to the database', error);
        process.exit(1);
    }
}
