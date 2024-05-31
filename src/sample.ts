import * as Effect from "effect/Effect"
import * as Context from "effect/Context"
import * as Console from "effect/Console"
import { NodeRuntime } from "@effect/platform-node"
import * as Layer from "effect/Layer"
import { pipe } from "effect/Function"

type Effect<A> = Effect.Effect<A>

type Dependencies = {
    somethingAsync: (param: string) => Effect<string>
}
const Dependencies = Context.GenericTag<Dependencies>("Dependencies")

const main = Effect.gen(function* () {
    const { somethingAsync } = yield* Dependencies
    const result = yield* somethingAsync("Andrea")
    const transformed = pipe(
        result,
        (x) => x.toUpperCase(),
        (x) => x + "!",
    )
    yield* Console.info(transformed)
})

const RealDependencies = Layer.succeed(
    Dependencies,
    Dependencies.of({
        somethingAsync: (param) => Effect.delay(Effect.succeed(`Hello ${param}`), 1000),
    }),
)

pipe(
    //keep new line
    main,
    Effect.provide(RealDependencies),
    NodeRuntime.runMain,
)
