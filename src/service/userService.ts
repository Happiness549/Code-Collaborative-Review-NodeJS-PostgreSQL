import { query } from "../config/database";
import bcrypt from 'bcryptjs'
import { User } from "../types/user.types";


export const findUserByEmail = async (email: string | null): Promise<User> => {
    const {rows} = await query("SELECT * FROM users WHERE EMAIL = $1", [email]);
    return rows[0] || null;

}

export const createUser = async (email: string,  password:string, role: string, name: string ): Promise<User> => {
    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password, salt);

    const {rows} = await query('INSERT INTO users (email, password_hash, role, name) VALUES($1,$2,$3,$4) RETURNING id, email, role, name',
         [email, password_hash, role, name]

    )
    return rows[0];

};


export const findAllUsers = async (): Promise<User[]> => {
    const {rows} = await query(
        "SELECT id, email, role, name FROM users ORDER BY id DESC"

    );
    return rows
}

export const findUserById = async (id: number): Promise<User | null> => {
    const { rows } = await query("SELECT * FROM users WHERE id = $1", [
        id,

    ]);
    return rows[0] || null;
}

export const updateUser = async (id: number, appData:User): Promise<User | null> =>{
     const { email, role, name } = appData;
       const { rows } = await query(
        `UPDATE users 
         SET email = $1, role = $2, name = $3 
         WHERE id = $4 
         RETURNING id, email, role, name`, 
        [email, role, name, id]
    );
    return rows[0] || null;
};

export const deleteUser = async (id:number): Promise<User | null> =>{
    const {rows} = await query(" DELETE FROM user WHERE id = $1 RETURNING *", [id]

    );
    return rows[0] || null;
};