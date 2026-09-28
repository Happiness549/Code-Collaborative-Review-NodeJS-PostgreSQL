import { query } from "../config/database";
import bcrypt from 'bcryptjs'
import { User } from "../types/user.types";


export const findUserByEmail = async (email: string | null): Promise<User> => {
    const {rows} = await query("SELECT * FROM users WHERE EMAIL = $1", [email]);
    return rows[0] || null;

}

export const createUser = async (email: string,  password:string, role: string ): Promise<User> => {
    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password, salt);

    const {rows} = await query('INSERT INTO users (email, password_hash, role) VALUES($1,$2,$3) RETURNING id, email, role',
         [email, password_hash, role]

    )
    return rows[0];

};

export const findUserById = async (id: number): Promise<User | null> => {
    const { rows } = await query("SELECT * FROM users WHERE id = $1", [
        id,

    ]);
    return rows[0] || null;
}

export const updateUser = async (id: number, appData:User): Promise<User | null> =>{
    // const {status} = appData
    const {rows} = await query("UPDATE users SET status = $1 WHERE id = $2 RETURNING*", 
        [ id]
    );
    return rows[0] || null;
};

export const deleteUser = async (id:number): Promise<User | null> =>{
    const {rows} = await query(" DELETE FROM user WHERE id = $1 RETURNING *", [id]

    );
    return rows[0] || null;
};