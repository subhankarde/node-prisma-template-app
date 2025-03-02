import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'

const token = (userId)=>{
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '7 days' })
}

export {token as default}
