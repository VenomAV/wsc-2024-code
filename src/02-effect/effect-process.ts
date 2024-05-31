import * as Effect from "effect/Effect"
import { Dependencies } from "./dependencies"
import { processSingleAnimal } from "./process-single-animal"

export const effectProcess = Effect.gen(function* () {
    const { readAllAnimals } = yield* Dependencies
    const animals = yield* readAllAnimals

    yield* Effect.forEach(animals, processSingleAnimal)
})
