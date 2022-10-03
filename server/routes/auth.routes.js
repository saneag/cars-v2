const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Minimum length of password is 6 symbols').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect register data'
                })
            }

            const { name, email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Existent user' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ name, email, password: hashedPassword })

            await user.save()
            res.status(201).json({ message: 'User created' })

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    })

router.post(
    '/login',
    [
        check('name', 'Enter the right name').not().isEmpty(),
        check('email', 'Enter the right email').normalizeEmail().isEmail(),
        check('password', 'Enter the rigth password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }

            const { name, email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Email or password does not match' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Email or password does not match' })
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                config.jwtSecret,
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    })

module.exports = router