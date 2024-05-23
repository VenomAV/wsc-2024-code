import * as Effect from "effect/Effect"
import * as Console from "effect/Console"
import * as Duration from "effect/Duration"
import { Command } from "@effect/cli"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { basicProcess } from "./basic/basic"
import { generateFakeData } from "./fake-data/generate"
import { effectProcess } from "./basic-effect/effect-process"
import { MongoDataAccess } from "./basic-effect/mongo-data-access"

const basic = Command.make("basic", {}, ({}) =>
    Effect.gen(function* (_) {
        const [duration] = yield* _(Effect.promise(basicProcess).pipe(Effect.timed))
        yield* _(Console.info(`Duration: ${Duration.format(duration)}`))
    }),
)

const effect = Command.make("effect", {}, ({}) =>
    Effect.gen(function* (_) {
        const [duration] = yield* _(
            effectProcess.pipe(Effect.timed, Effect.withConcurrency(1), Effect.provide(MongoDataAccess)),
        )
        yield* _(Console.info(`Duration: ${Duration.format(duration)}`))
    }),
)

const concurrency = Command.make("concurrency", {}, ({}) =>
    Effect.gen(function* (_) {
        const [duration] = yield* _(
            effectProcess.pipe(Effect.timed, Effect.withConcurrency(50), Effect.provide(MongoDataAccess)),
        )
        yield* _(Console.info(`Duration: ${Duration.format(duration)}`))
    }),
)

const generate = Command.make("generate", {}, ({}) =>
    Effect.gen(function* (_) {
        const [duration] = yield* _(Effect.promise(generateFakeData).pipe(Effect.timed))
        yield* _(Console.info(`Duration: ${Duration.format(duration)}`))
    }),
)

const performance = Command.make("performance", {}, ({}) => Console.info(`Hello world`)).pipe(
    Command.withSubcommands([basic, generate, effect, concurrency]),
)

const cli = Command.run(performance, {
    name: "performance",
    version: "v0.0.1",
})

Effect.suspend(() => cli(process.argv)).pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain)
