import * as Request from "effect/Request"
import { Animal, Diet, Plant } from "../types"

export interface ReadAllAnimals extends Request.Request<readonly Animal[]> {
    readonly _tag: "ReadAllAnimals"
}

export const ReadAllAnimals = Request.tagged<ReadAllAnimals>("ReadAllAnimals")

export interface ReadPlantsByCountry extends Request.Request<readonly Plant[]> {
    readonly _tag: "ReadPlantsByCountry"
    readonly country: string
}

export const ReadPlantsByCountry = Request.tagged<ReadPlantsByCountry>("ReadPlantsByCountry")

export interface SendDiet extends Request.Request<void> {
    readonly _tag: "SendDiet"
    readonly diet: Diet
}

export const SendDiet = Request.tagged<SendDiet>("SendDiet")
