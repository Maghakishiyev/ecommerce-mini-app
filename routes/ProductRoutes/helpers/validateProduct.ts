import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const validateProduct = [
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),

    body('name').isString().notEmpty().withMessage('Name is required'),

    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),

    body('available_memory')
        .optional()
        .isArray()
        .withMessage('Available memory must be an array')
        .custom((memoryArray) => {
            if (memoryArray && memoryArray.length > 0) {
                for (const memory of memoryArray) {
                    if (typeof memory !== 'string') {
                        throw new Error('Each memory value must be a string');
                    }
                }
            }
            return true;
        }),

    body('available_colors')
        .optional()
        .isArray()
        .withMessage('Available colors must be an array')
        .custom((colorsArray) => {
            if (colorsArray && colorsArray.length > 0) {
                for (const color of colorsArray) {
                    if (typeof color !== 'string') {
                        throw new Error('Each color value must be a string');
                    }
                }
            }
            return true;
        }),

    body('details')
        .optional()
        .isObject()
        .withMessage('Details must be an object'),

    body('product_image_url')
        .optional()
        .isURL()
        .withMessage('Product image URL must be a valid URL'),

    body('details.screenSize')
        .optional()
        .isString()
        .withMessage('Screen size must be a string'),
    body('details.cpu')
        .optional()
        .isString()
        .withMessage('CPU must be a string'),
    body('details.numberOfCores')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Number of cores must be a positive integer'),
    body('details.mainCamera')
        .optional()
        .isString()
        .withMessage('Main camera must be a string'),
    body('details.frontCamera')
        .optional()
        .isString()
        .withMessage('Front camera must be a string'),
    body('details.batteryCapacity')
        .optional()
        .isString()
        .withMessage('Battery capacity must be a string'),

    (req: Request, res: Response, next: Function) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
