import * as Effect from "effect/Effect"
import * as Console from "effect/Console"
import { Command, Options, Args } from "@effect/cli"
import { NodeContext, NodeRuntime } from "@effect/platform-node"

const performance = Command.make(
    "performance",
    { },
    ({  }) =>
        Console.info(
            `Hello world`,
        ),
)

const cli = Command.run(performance, {
    name: "performance",
    version: "v0.0.1",
})

Effect.suspend(() => cli(process.argv)).pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain)
