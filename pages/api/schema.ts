import { objectType, queryType, makeSchema, stringArg, nonNull, idArg, mutationType } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import path from 'path'
import prisma from "./prisma"

export const schema = makeSchema({
  plugins: [
    nexusPrisma({ experimentalCRUD: true })
  ],
  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/schema.graphql'),
  },
  // contextType: {
  //   module: require.resolve('.prisma/client/index.d.ts'),
  //   export: 'PrismaClient',
  // },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
  types: [
    // queryType({
    //   definition(t) {
    //     t.crud.func()
    //   }
    // }),
    // mutationType({
    //   definition(t) {
    //     t.crud.createOneFunc()
    //   }
    // })
  ],
})
