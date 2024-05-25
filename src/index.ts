import * as Effect from "effect/Effect"
import * as Console from "effect/Console"
import * as Duration from "effect/Duration"
import { Command } from "@effect/cli"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { basicProcess } from "./01-basic/basic"
import { generateFakeData } from "./fake-data/generate"
import { effectProcess } from "./02-effect/effect-process"
import { MongoDependencies } from "./02-effect/mongo-dependencies"
import { CachedMongoDependencies } from "./04-cache/cached-mongo-dependencies"
import { BatchedCachedMongoDependencies } from "./05-batched/batched-cached-mongo-dependencies"
import { concurrentProcess } from "./03-concurrency/concurrent-process"
import { batchedProcess } from "./05-batched/batched-process"

const basic = Command.make("basic", {}, ({}) =>
    Effect.gen(function* (_) {
        const [duration] = yield* _(Effect.promise(basicProcess).pipe(Effect.timed))
        yield* _(Console.info(`Duration: ${Duration.format(duration)}`))
    }),
)

const effect = Command.make("effect", {}, ({}) =>
    Effect.gen(function* (_) {
        const [duration] = yield* _(effectProcess.pipe(Effect.timed, Effect.provide(MongoDependencies)))
        yield* _(Console.info(`Duration: ${Duration.format(duration)}`))
    }),
)

const concurrency = Command.make("concurrency", {}, ({}) =>
    Effect.gen(function* (_) {
        const [duration] = yield* _(
            concurrentProcess.pipe(Effect.timed, Effect.withConcurrency(10), Effect.provide(MongoDependencies)),
        )
        yield* _(Console.info(`Duration: ${Duration.format(duration)}`))
    }),
)

const cached = Command.make("cached", {}, ({}) =>
    Effect.gen(function* (_) {
        const [duration] = yield* _(
            concurrentProcess.pipe(Effect.timed, Effect.withConcurrency(10), Effect.provide(CachedMongoDependencies)),
        )
        yield* _(Console.info(`Duration: ${Duration.format(duration)}`))
    }),
)

const batched = Command.make("batched", {}, ({}) =>
    Effect.gen(function* (_) {
        const [duration] = yield* _(
            batchedProcess.pipe(
                Effect.timed,
                Effect.withConcurrency(10),
                Effect.withRequestBatching(true),
                Effect.provide(BatchedCachedMongoDependencies),
            ),
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
    Command.withSubcommands([basic, generate, effect, concurrency, cached, batched]),
)

const cli = Command.run(performance, {
    name: "performance",
    version: "v0.0.1",
})

Effect.suspend(() => cli(process.argv)).pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain)
