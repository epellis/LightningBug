import { objectType, queryType, makeSchema, stringArg, nonNull, idArg } from 'nexus'
import path from 'path'
import prisma from "../prisma"

const Func = objectType({
  name: 'Func',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.string('contents')
  },
})

const FuncQuery = queryType({
  definition(t) {
    t.field('func', {
      type: Func,
      args: {
        funcId: nonNull(idArg())
      },
      resolve: (_, args) => {
        return prisma.func.findUnique({
          where: { id: Number(args.funcId) }
        })
      }
    })
  }
})

export const schema = makeSchema({
  types: [Func, FuncQuery],
  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/schema.graphql'),
  },
})
