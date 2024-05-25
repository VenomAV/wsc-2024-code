import * as Layer from "effect/Layer"
import * as Effect from "effect/Effect"
import { Dependencies } from "../02-effect/dependencies"
import { ReadAllAnimals, ReadPlantsByCountry, SendDiet } from "../02-effect/requests"
import { ReadAllAnimalsResolver, ReadPlantsByCountryResolver, SendDietResolver } from "../02-effect/resolvers"

export const CachedMongoDependencies = Layer.succeed(
    Dependencies,
    Dependencies.of({
        readAllAnimals: Effect.request(ReadAllAnimals({}), ReadAllAnimalsResolver),
        readPlantsByCountry: (country) =>
            Effect.request(ReadPlantsByCountry({ country }), ReadPlantsByCountryResolver).pipe(
                Effect.withRequestCaching(true),
            ),
        sendDiet: (diet) => Effect.request(SendDiet({ diet }), SendDietResolver),
    }),
)
