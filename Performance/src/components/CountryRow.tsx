import { JSX } from 'react';

interface Country {
    name: string;
    population: number;
    region: string;
    flag: string;
}

interface CountryRowProps {
    country: Country;
}

function CountryRow({ country }: CountryRowProps): JSX.Element {
    return (
        <tr style={{ borderBottom: '1px solid blue' }}>
            <td style={{ border: '1px solid blue', padding: '5px' }}>
                <img src={country.flag} alt={country.name} style={{ width: '30px' }} />
            </td>
            <td style={{ border: '1px solid blue', padding: '5px' }}>{country.name}</td>
            <td style={{ border: '1px solid blue', padding: '5px' }}>{country.population.toLocaleString()}</td>
            <td style={{ border: '1px solid blue', padding: '5px' }}>{country.region}</td>
        </tr>
    );
}

export default CountryRow;