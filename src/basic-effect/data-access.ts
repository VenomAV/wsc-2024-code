import * as Effect from "effect/Effect"
import { Animal, Diet, Plant } from "../types"
import * as Context from "effect/Context"

export type DataAccess = {
    readAllAnimals: Effect.Effect<readonly Animal[]>
    readPlantsByCountry: (country: string) => Effect.Effect<readonly Plant[]>
    sendDiet: (diet: Diet) => Effect.Effect<void>
}
export const DataAccess = Context.GenericTag<DataAccess>("DataAccess")
