import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '@/models/user/model';
import jwt from 'jsonwebtoken';
import { hashPassword } from '@/utils/hashPassword';
import { authCheck, ReqWithUser } from '@/middleware';
import config from '@/configs';

const router = express.Router();

const JWT_SECRET = config.jwt_secret;

router.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('Received request', email, password);
    try {
        const user = await User.findOne({ email });
        console.log('User is', user);
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        const { password: _removed, ...userWithoutPassword } = user?.toObject();

        res.json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/signup', async (req: Request, res: Response) => {
    const { email, password, phoneNumber, fullName } = req.body;
    console.log(req.body);
    try {
        const hashedPassword = await hashPassword(password);
        const user = new User({
            email,
            password: hashedPassword,
            phoneNumber,
            fullName
        });

        await user.save(); // Save the user first

        // Generate a token and return the response
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        const { password: _removed, ...userWithoutPassword } = user?.toObject();

        res.status(201).json({ user: userWithoutPassword, token });
    } catch (error) {
        res.status(500).json({ message: 'Error creating the user', error });
    }
});

router.put(`/user/:id`, authCheck, async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        email,
        firstName,
        lastName,
        birthday,
        phoneNumber,
        address,
        idCardaddress,
        apartmentaddress,
        cityaddress,
        countryaddress,
    } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                email,
                firstName,
                lastName,
                phoneNumber,
                birthday,
                address,
                idCardaddress,
                apartmentaddress,
                cityaddress,
                countryaddress,
            },
            { new: true, runValidators: true, overwrite: true }
        ); // Ensure the entire document is replaced

        if (!updatedUser) {
            return res.status(404).send('User not found.');
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Token Refresh
router.post('/refresh', authCheck, (req: ReqWithUser, res: Response) => {
    const user = req.user; // From authCheck middleware
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const newToken = jwt.sign({ userId: user.userId }, JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(200).json({ token: newToken });
});

export default router;
