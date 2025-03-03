import { Planet } from '../Types/PlanetType'
export default interface Result {
    count: number
    next: null | string
    previous: null | string
    results: Array<Planet>
}
