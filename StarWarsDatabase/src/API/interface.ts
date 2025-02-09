import { Planet } from "../components/main/type"
export default interface Result{
    count: number, 
    next: null|string, 
    previous: null|string, 
    results: Array<Planet>
}