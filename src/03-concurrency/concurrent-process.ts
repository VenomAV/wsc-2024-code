import * as Effect from "effect/Effect"
import { Dependencies } from "../02-effect/dependencies"
import { processSingleAnimal } from "../02-effect/process-single-animal"

export const concurrentProcess = Effect.gen(function* (_) {
    const { readAllAnimals } = yield* _(Dependencies)
    const animals = yield* _(readAllAnimals)

    yield* _(Effect.forEach(animals, processSingleAnimal, { concurrency: "inherit" }))
})
