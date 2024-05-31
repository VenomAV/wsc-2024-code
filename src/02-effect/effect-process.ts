import * as Effect from "effect/Effect"
import { Dependencies } from "./dependencies"
import { processDietForAnimal } from "./process-diet-for-animal"

export const effectProcess = Effect.gen(function* () {
    const { readAllAnimals } = yield* Dependencies
    const animals = yield* readAllAnimals

    yield* Effect.forEach(animals, processDietForAnimal)
})
