import { hashPassword } from './hashPassword'; // Adjust the path based on your project structure

describe('hashPassword Utility Function', () => {
    it('should return a hash different from the original password', async () => {
        const password = 'TestPassword123!';
        const hashedPassword = await hashPassword(password);

        expect(hashedPassword).not.toBe(password);
        expect(hashedPassword.length).toBeGreaterThan(0);
    });

    it('should produce a unique hash for the same input on different calls', async () => {
        const password = 'TestPassword123!';
        const hash1 = await hashPassword(password);
        const hash2 = await hashPassword(password);

        expect(hash1).not.toBe(hash2); // Even though input is the same, output should differ because of salting
    });

    it('should throw an error if hashing fails', async () => {
        const badPassword = undefined; // Simulate bad input
        await expect(hashPassword(badPassword as any)).rejects.toThrow();
    });
});
