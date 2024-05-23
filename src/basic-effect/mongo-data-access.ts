import * as Layer from "effect/Layer"
import * as Effect from "effect/Effect"
import * as Request from "effect/Request"
import * as RequestResolver from "effect/RequestResolver"
import { DataAccess } from "./data-access"
import { MongoClient } from "mongodb"
import { Animal, Diet, Plant } from "../types"

const client = await MongoClient.connect("mongodb://localhost:27017")
const db = client.db("diets")

export interface ReadAllAnimals extends Request.Request<readonly Animal[]> {
    readonly _tag: "ReadAllAnimals"
}
export const ReadAllAnimals = Request.tagged<ReadAllAnimals>("ReadAllAnimals")

export interface ReadPlantsByCountry extends Request.Request<readonly Plant[]> {
    readonly _tag: "ReadPlantsByCountry"
    readonly country: string
}
export const ReadPlantsByCountry = Request.tagged<ReadPlantsByCountry>("ReadPlantsByCountry")

export interface SendDiet extends Request.Request<void> {
    readonly _tag: "SendDiet"
    readonly diet: Diet
}
export const SendDiet = Request.tagged<SendDiet>("SendDiet")

const ReadAllAnimalsResolver = RequestResolver.fromEffect(() =>
    Effect.promise(() => db.collection<Animal>("animals").find({}).toArray()),
)

const ReadPlantsByCountryResolver = RequestResolver.fromEffect(({ country }: ReadPlantsByCountry) =>
    Effect.promise(() => db.collection<Plant>("plants").find({ country }).toArray()),
)

const SendDietResolver = RequestResolver.fromEffect(({ diet }: SendDiet) =>
    Effect.promise(() => db.collection<Diet>("diets").insertOne(diet)),
)

export const MongoDataAccess = Layer.succeed(
    DataAccess,
    DataAccess.of({
        readAllAnimals: Effect.request(ReadAllAnimals({}), ReadAllAnimalsResolver),
        readPlantsByCountry: (country) => Effect.request(ReadPlantsByCountry({ country }), ReadPlantsByCountryResolver),
        sendDiet: (diet) => Effect.request(SendDiet({ diet }), SendDietResolver),
    }),
)
