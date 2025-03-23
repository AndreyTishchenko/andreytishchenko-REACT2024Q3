import React from 'react';

interface Country {
    name: string;
    population: number;
    region: string;
    flag: string;
}

interface CountryTableProps {
    countries: Country[];
    handleSort: (key: string) => void;
    sortKey: string;
    sortOrder: 'asc' | 'desc';
    toggleCountrySelection: (countryName: string) => void;
    selectedCountries: string[];
    regions: string[];
    selectedRegion: string;
    handleRegionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountryTable: React.FC<CountryTableProps> = ({
    countries,
    handleSort,
    sortKey,
    sortOrder,
    toggleCountrySelection,
    selectedCountries,
    regions,
    selectedRegion,
    handleRegionChange,
}) => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr>
                    <th>Flag</th>
                    <th onClick={() => handleSort('name')}>
                        Name {sortKey === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th onClick={() => handleSort('population')}>
                        Population {sortKey === 'population' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th>
                        <select
                            onChange={handleRegionChange}
                            value={selectedRegion}
                            style={{ color: 'red', backgroundColor: 'transparent', border: 'none' }}
                        >
                            <option value="">All Regions</option>
                            {regions.map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </th>
                </tr>
            </thead>
            <tbody>
                {countries.map((country) => {
                    const isSelected = selectedCountries.includes(country.name);
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
                })}
            </tbody>
        </table>
    );
};

export default CountryTable;
