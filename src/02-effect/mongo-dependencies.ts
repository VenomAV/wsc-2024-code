import * as Layer from "effect/Layer"
import * as Effect from "effect/Effect"
import { Dependencies } from "./dependencies"
import { ReadAllAnimals, ReadPlantsByCountry, SendDiet } from "./requests"
import { ReadAllAnimalsResolver, ReadPlantsByCountryResolver, SendDietResolver } from "./resolvers"

export const MongoDependencies = Layer.succeed(
    Dependencies,
    Dependencies.of({
        readAllAnimals: Effect.request(ReadAllAnimals({}), ReadAllAnimalsResolver),
        readPlantsByCountry: (country) => Effect.request(ReadPlantsByCountry({ country }), ReadPlantsByCountryResolver),
        sendDiet: (diet) => Effect.request(SendDiet({ diet }), SendDietResolver),
    }),
)
