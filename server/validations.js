import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must contain atleast 5 symbols').isLength({ min: 5 })
]

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must contain atleast 5 symbols').isLength({ min: 5 }),
    body('name', 'Enter your name').isLength({ min: 3 }),
    body('avatarUrl', 'Invalid url for avatar').optional().isURL(),
]

export const createCarValidation = [
    body('brand', 'Enter a valid brand').isString().isLength({ min: 3 }),
    body('model', 'Enter a valid model').isString().isLength({ min: 3 }),
    body('year', 'Enter a valid year').isNumeric().isLength({ min: 4 }),
    body('fuel_type', 'Enter a valid fuel type').isString().isLength({ min: 3 }),
    body('engine_capacity', 'Enter a valid engine capacity in milliliters').isNumeric().isLength({ min: 0, max: 5 }),
    body('engine_power', 'Enter a valid engine power in horsepower').isNumeric().isLength({ min: 2 }),
    body('traction_type', 'Enter a valid traction type').isString().isLength({ min: 3 }),
    body('gearbox_type', 'Enter a valid gearbox type').isString().isLength({ min: 3 }),
    body('price', 'Enter a valid price').isNumeric().isLength({ min: 1 }),
    body('imageUrl', 'Invalid url for image').isString(),
]