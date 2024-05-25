import { Animal, Diet, Plant } from "../types"
import { MongoClient } from "mongodb"

const client = await MongoClient.connect("mongodb://localhost:27017")
const db = client.db("diets")

export const readAllAnimals: () => Promise<readonly Animal[]> = () =>
    db.collection<Animal>("animals").find({}).toArray()

export const readPlantsByCountry = (country: string): Promise<readonly Plant[]> =>
    db.collection<Plant>("plants").find({ country }).toArray()

export const sendDiet = async (diet: Diet) => {
    await db.collection<Diet>("diets").insertOne(diet)
}
