import IPlanet from './PlanetType'

export default interface IResults {
    count: 60
    next: 'https://swapi.dev/api/planets/?page=2'
    previous: null
    results: Array<IPlanet>
}
