export type Animal = {
    animalId: string
    country: string
    //other fields
}
export type Plant = {
    plantId: string
    country: string
    //other fields
}
export type Diet = {
    animalId: string
    plantIds: readonly string[]
}
