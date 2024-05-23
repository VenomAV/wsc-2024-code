export type Animal = {
    id: string
    country: string
    //other fields
}
export type Plant = {
    id: string
    country: string
    //other fields
}
export type Diet = {
    animalId: string
    plantIds: readonly string[]
}
