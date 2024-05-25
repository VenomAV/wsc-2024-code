import { MongoClient } from "mongodb"
import * as RequestResolver from "effect/RequestResolver"
import * as Request from "effect/Request"
import * as Effect from "effect/Effect"
import { Animal, Diet, Plant } from "../types"
import { ReadPlantsByCountry, SendDiet } from "../02-effect/requests"

const client = await MongoClient.connect("mongodb://localhost:27017")
const db = client.db("diets")

export const ReadAllAnimalsResolver = RequestResolver.fromEffect(() =>
    Effect.promise(() => db.collection<Animal>("animals").find({}).toArray()),
)

export const ReadPlantsByCountryResolver = RequestResolver.fromEffect(({ country }: ReadPlantsByCountry) =>
    Effect.promise(() => db.collection<Plant>("plants").find({ country }).toArray()),
)

export const SendDietBatchResolver = RequestResolver.makeBatched((requests: readonly SendDiet[]) =>
    Effect.gen(function* (_) {
        yield* _(Effect.promise(() => db.collection<Diet>("diets").insertMany(requests.map((r) => r.diet))))
        yield* _(Effect.forEach(requests, Request.completeEffect(Effect.void)))
    }),
).pipe(RequestResolver.batchN(1000))
