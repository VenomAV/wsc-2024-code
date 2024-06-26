import * as Effect from "effect/Effect"
import { Dependencies } from "../02-effect/dependencies"
import { processDietForAnimal } from "../02-effect/process-diet-for-animal"

export const concurrentProcess = Effect.gen(function* () {
    const { readAllAnimals } = yield* Dependencies
    const animals = yield* readAllAnimals

    yield* Effect.forEach(animals, processDietForAnimal, { concurrency: 10 })
})
