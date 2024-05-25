import { Animal, Diet, Plant } from "../types"
import * as Effect from "effect/Effect"
import { Dependencies } from "./dependencies"

export const processSingleAnimal = (animal: Animal) =>
    Effect.gen(function* (_) {
        const { readPlantsByCountry, sendDiet } = yield* _(Dependencies)
        const plants = yield* _(readPlantsByCountry(animal.country))
        const selectedPlants = selectPlantsByAnimal(plants, animal)
        const diet = createDietFor(animal, selectedPlants)

        if (diet) yield* _(sendDiet(diet))
    })

const selectPlantsByAnimal = (plants: readonly Plant[], animal: Animal): readonly Plant[] => {
    const howMany = Math.min(Math.floor(Math.random() * 10) + 1, plants.length)
    const startingFrom = Math.floor(Math.random() * (plants.length - howMany))
    return plants.slice(startingFrom, startingFrom + howMany)
}

const createDietFor = (stuff: Animal, otherStuff: readonly Plant[]): Diet | undefined => {
    const doTheyEat = Math.random() > 0.5
    return !doTheyEat ? undefined : { animalId: stuff.animalId, plantIds: otherStuff.map((x) => x.plantId) }
}
