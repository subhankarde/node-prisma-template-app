import Query from './Query'
import Mutation from './Mutation'
import User from './User'
import Post from './Post'
import Comment from './Comment'
import Subscription from './Subscription'
import { extractFragmentReplacements } from 'prisma-binding'

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
}

const fragmentsReplacements = extractFragmentReplacements(resolvers)
export { resolvers, fragmentsReplacements }