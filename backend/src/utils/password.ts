import argon2 from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, {
    type: argon2.argon2i,
    memoryCost: 2 ** 16,   // 64 Mo
    timeCost: 3,           // Nombre d’itérations
    parallelism: 1         // Threads
  });
};


export const verifyPassword = async (hashedPassword: string , password: string): Promise<boolean> => {
    return argon2.verify(hashedPassword, password);
}