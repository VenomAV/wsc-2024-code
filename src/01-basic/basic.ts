import { Animal, Diet, Plant } from "../types"
import { readAllAnimals, readPlantsByCountry, sendDiet } from "./api"

export const basicProcess = async () => {
    const allAnimal = await readAllAnimals()
    const animalByCountry = groupAnimalByCountry(allAnimal)

    for (const country of Object.keys(animalByCountry)) {
        const plants = await readPlantsByCountry(country)

        for (const animal of animalByCountry[country] ?? []) {
            const selectedPlants = selectPlantsByAnimal(plants, animal)
            const diet = createDietFor(animal, selectedPlants)

            if (diet) await sendDiet(diet)
        }
    }
}

const selectPlantsByAnimal = (plants: readonly Plant[], animal: Animal): readonly Plant[] => {
    const howMany = Math.min(Math.floor(Math.random() * 10) + 1, plants.length)
    const startingFrom = Math.floor(Math.random() * (plants.length - howMany))
    return plants.slice(startingFrom, startingFrom + howMany)
}
const createDietFor = (stuff: Animal, otherStuff: readonly Plant[]): Diet | undefined => {
    const doTheyEat = Math.random() > 0.5
    return !doTheyEat ? undefined : { animalId: stuff.animalId, plantIds: otherStuff.map((x) => x.plantId) }
}

const groupAnimalByCountry = (allStuff: readonly Animal[]): Record<string, Animal[]> =>
    allStuff.reduce((p, c) => {
        if (!p[c.country]) p[c.country] = []
        p[c.country].push(c)
        return p
    }, {})
