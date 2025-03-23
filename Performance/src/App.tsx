import React, { useState, useEffect } from 'react';
import CountryTable from './components/CountryTable';
import Search from './components/searchComponent';
import { fetchCountries } from './components/countryService';

interface Country {
    name: string;
    population: number;
    region: string;
    flag: string;
}

function App(): React.ReactNode {
    const [countries, setCountries] = useState<Country[]>([]);
    const [search, setSearch] = useState<string>('');
    const [sortKey, setSortKey] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

    useEffect(() => {
        const storedSelectedCountries = localStorage.getItem('selectedCountries');
        if (storedSelectedCountries) {
            setSelectedCountries(JSON.parse(storedSelectedCountries));
        }
    }, []);

    useEffect(() => {
        fetchCountries().then((data) => setCountries(data));
    }, []);

    const regions = Array.from(new Set(countries.map((country) => country.region))).sort();

    const sortedCountries = [...countries].sort((a, b) => {
        if (a[sortKey as keyof Country] < b[sortKey as keyof Country]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey as keyof Country] > b[sortKey as keyof Country]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredCountries = sortedCountries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedRegion === '' || country.region === selectedRegion)
    );

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRegion(e.target.value);
    };

    const toggleCountrySelection = (countryName: string) => {
        const updatedSelectedCountries = selectedCountries.includes(countryName)
            ? selectedCountries.filter((name) => name !== countryName)
            : [...selectedCountries, countryName];

        setSelectedCountries(updatedSelectedCountries);
        localStorage.setItem('selectedCountries', JSON.stringify(updatedSelectedCountries));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <Search value={search} onChange={(e) => setSearch(e.target.value)} />
            <CountryTable
                countries={filteredCountries}
                handleSort={handleSort}
                sortKey={sortKey}
                sortOrder={sortOrder}
                toggleCountrySelection={toggleCountrySelection}
                selectedCountries={selectedCountries}
                regions={regions}
                selectedRegion={selectedRegion}
                handleRegionChange={handleRegionChange}
            />

        </div>
    );
}

export default App;
