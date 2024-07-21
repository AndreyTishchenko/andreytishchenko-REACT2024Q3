import IResults from '../../Types/ApiResultsType'
import IPlanet from '../../Types/PlanetType'
import Card from '../card/card'

export default function CardsList(prop: { ApiResults: IResults }) {
    return (
        <>
            <div className="grid-div">
                {prop.ApiResults.results.map((planet: IPlanet) => {
                    const numEl = String(planet.url.replace(/[^\d]/g, ''))
                    console.log(numEl)
                    return <Card index={numEl} planet={planet}></Card>
                })}
            </div>
        </>
    )
}
