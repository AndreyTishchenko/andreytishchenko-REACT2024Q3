import { Planet } from './PlanetType'
export default interface Result {
    count: number
    next: null | string
    previous: null | string
    results: Array<Planet>
}
