import jwt from 'jsonwebtoken';

// Generate a JWT token
export const generateToken = (userId: string, organizationName: string, organizationLocation: string | null): string => {
    return jwt.sign({ userId, organizationName, organizationLocation }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
}
