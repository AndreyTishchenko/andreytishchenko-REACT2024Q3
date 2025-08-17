import { Planet } from './Planet'
export default interface Result {
    count: number
    next: null | string
    previous: null | string
    result: Array<Planet>
}
