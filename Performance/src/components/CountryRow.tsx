import { JSX } from 'react';
import React from 'react';

interface Country {
    name: string;
    population: number;
    region: string;
    flag: string;
}

interface CountryRowProps {
    country: Country;
    isSelected: boolean;
    toggleCountrySelection: (countryName: string) => void;
}

const CountryRow = React.memo(({ country, isSelected, toggleCountrySelection }: CountryRowProps): JSX.Element => {
    return (
        <tr
            key={country.name}
            onClick={() => toggleCountrySelection(country.name)}
            style={{
                borderBottom: '1px solid blue',
                backgroundColor: isSelected ? '#d0ebff' : 'transparent',
                cursor: 'pointer',
            }}
        >
            <td style={{ border: '1px solid blue', padding: '5px' }}>
                <img src={country.flag} alt={country.name} style={{ width: '30px' }} />
            </td>
            <td style={{ border: '1px solid blue', padding: '5px' }}>{country.name}</td>
            <td style={{ border: '1px solid blue', padding: '5px' }}>{country.population.toLocaleString()}</td>
            <td style={{ border: '1px solid blue', padding: '5px' }}>{country.region}</td>
        </tr>
    );
});

export default CountryRow;
