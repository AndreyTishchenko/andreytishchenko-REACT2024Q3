import IResults from '../../Types/ApiResultsType'
import IPlanet from '../../Types/PlanetType'
import Card from '../card/card'

export default function CardsList(prop: { ApiResults: IResults}) {
    return (
        <>
            <div className="grid-div" role='CardList'>
                {(prop.ApiResults as IResults).results.map((planet: IPlanet) => {
                    const numEl = String(planet.url.replace(/[^\d]/g, ''));
                    return <Card index={numEl} planet={planet} key={numEl}></Card>
                })}
            </div>
        </>
    )
}
