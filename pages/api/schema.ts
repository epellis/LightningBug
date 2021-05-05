import { Func } from 'nexus-prisma'
import { makeSchema, mutationType, objectType, queryType } from 'nexus'

export const schema = makeSchema({
  types: [
    objectType({
      name: Func.$name,
      description: Func.$description,
      definition(t) {
        t.field(Func.id.name, Func.id)
        t.field(Func.name.name, Func.name)
        t.field(Func.contents.name, Func.contents)
      }
    }),
    queryType({
      definition(t) {
        t.field(Func.id.name, Func.id)
      }
    }),
    mutationType({
      definition(t) {
        t.field(Func.name.name, Func.name)
        t.field(Func.contents.name, Func.contents)
      }
    }),
  ]
})
