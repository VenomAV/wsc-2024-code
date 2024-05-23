import { Animal, Plant } from "../types"
import { MongoClient } from "mongodb"
import { faker } from "@faker-js/faker"

const client = await MongoClient.connect("mongodb://localhost:27017")
const db = client.db("diets")

export const generateFakeData = async () => {
    await generateAnimals()
    await generatePlants()
}

const generateAnimals = async () => {
    const animalCollection = db.collection<Animal>("animals")

    await dropCollection("animals")
    for (let i = 0; i < 10; i++) {
        const animals = Array.from({ length: 1000 }, randomAnimal)
        await animalCollection.insertMany(animals)
    }
}

const generatePlants = async () => {
    const plantCollection = db.collection<Plant>("plants")

    await dropCollection("plants")
    for (let i = 0; i < 100; i++) {
        const plants = Array.from({ length: 1000 }, randomPlant)
        await plantCollection.insertMany(plants)
    }
}

const dropCollection = async (collectionName: string) => {
    const collections = await db.collections()
    if (collections.some((c) => c.collectionName === collectionName)) await db.collection<Plant>(collectionName).drop()
}

const randomAnimal = (): Animal => ({
    animalId: faker.string.uuid(),
    country: faker.location.country(),
})

const randomPlant = (): Plant => ({
    plantId: faker.string.uuid(),
    country: faker.location.country(),
})
