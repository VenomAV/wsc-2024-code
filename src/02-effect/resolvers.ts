import * as RequestResolver from "effect/RequestResolver"
import * as Effect from "effect/Effect"
import { Animal, Diet, Plant } from "../types"
import { MongoClient } from "mongodb"
import { ReadPlantsByCountry, SendDiet } from "./requests"

const client = await MongoClient.connect("mongodb://localhost:27017")
const db = client.db("diets")

export const ReadAllAnimalsResolver = RequestResolver.fromEffect(() =>
    Effect.promise(() => db.collection<Animal>("animals").find({}).toArray()),
)

export const ReadPlantsByCountryResolver = RequestResolver.fromEffect(({ country }: ReadPlantsByCountry) =>
    Effect.promise(() => db.collection<Plant>("plants").find({ country }).toArray()),
)

export const SendDietResolver = RequestResolver.fromEffect(({ diet }: SendDiet) =>
    Effect.promise(() => db.collection<Diet>("diets").insertOne(diet)),
)
