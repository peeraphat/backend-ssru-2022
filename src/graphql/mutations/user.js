import { schemaComposer } from 'graphql-compose'
import { UserTC } from '../../db/model'

export const createOneUser = UserTC.getResolver('createOne')