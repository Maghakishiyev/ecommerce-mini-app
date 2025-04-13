import bcrypt from "bcryptjs"

const saltRounds: number = 12;

export async function hashPassword(password: string): Promise<string> {
    try {
        const salt: string = await bcrypt.genSalt(saltRounds);
        const hash: string = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Error hashing password', error);
        throw error;
    }
}

