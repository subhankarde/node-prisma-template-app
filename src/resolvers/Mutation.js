import bcrypt, { compare } from 'bcrypt'
import getUserId from '../utils/getUserId'
import token from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password)
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password,
                createdDate: today.toISOString(),
                updatedDate: today.toISOString()
            }
        })

        return {
            user,
            token: token(user.id)
        }
    },
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }

        return {
            user,
            token: token(user.id)
        }
    },
    async deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        if(typeof args.data.password === 'string'){
            args.data.password = await hashPassword(args.data.password)
        }
        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data,
            updatedDate: today.toISOString()
        }, info)
    }
}    

export { Mutation as default }