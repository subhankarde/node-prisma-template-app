import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
    input: {
        name: 'Jen',
        email: 'jen@example.com',
        password: bcrypt.hashSync('Red098!@#$',10)
    },
    user: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: 'Jeff',
        email: 'jeff@example.com',
        password: bcrypt.hashSync('PassForJeff',10)
    },
    user: undefined,
    jwt: undefined
}

const postOne = {
    input: {
        title: 'My published post',
        body: '',
        published: true
    },
    post: undefined
}

const postTwo = {
    input: {
        title: 'My draft post',
        body: '',
        published: false
    },
    post: undefined
}

const commentOne = {
    input: {
        text: 'Great post. Thanks for sharing!'
    },
    comment: undefined
}

const commentTwo = {
    input: {
        text: 'I am glad you enjoyed it.'
    },
    comment: undefined
}

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

    // Create user two
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })
    userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)

}
export { seedDatabase as default, userOne, userTwo }