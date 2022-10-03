import jwt from "jsonwebtoken"
import config from "../config/default.json" assert {type: 'json'}

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, config.jwtSecret)
            req.userId = decoded._id
            next()
        }
        catch (err) {
            return res.status(403).json({
                message: 'Acces denied'
            })
        }
    } else {
        return res.status(403).json({
            message: 'Acces denied'
        })
    }
}