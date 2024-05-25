import * as Effect from "effect/Effect"
import { Dependencies } from "./dependencies"
import { processSingleAnimal } from "./process-single-animal"

export const effectProcess = Effect.gen(function* (_) {
    const { readAllAnimals } = yield* _(Dependencies)
    const animals = yield* _(readAllAnimals)

    yield* _(Effect.forEach(animals, processSingleAnimal))
})
