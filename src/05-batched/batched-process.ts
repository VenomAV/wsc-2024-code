import * as Effect from "effect/Effect"
import { Dependencies } from "../02-effect/dependencies"
import { processSingleAnimal } from "../02-effect/process-single-animal"

export const batchedProcess = Effect.gen(function* () {
    const { readAllAnimals } = yield* Dependencies
    const animals = yield* readAllAnimals

    yield* Effect.forEach(animals, processSingleAnimal, { concurrency: "inherit", batching: "inherit" })
})
