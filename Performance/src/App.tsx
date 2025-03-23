import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
        fetchCountries().then(setCountries);
    }, []);

    const regions = useMemo(() => Array.from(new Set(countries.map((c) => c.region))).sort(), [countries]);

    const sortedCountries = useMemo(() => {
        return [...countries].sort((a, b) => {
            if (a[sortKey as keyof Country] < b[sortKey as keyof Country]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortKey as keyof Country] > b[sortKey as keyof Country]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [countries, sortKey, sortOrder]);

    const filteredCountries = useMemo(() => {
        return sortedCountries.filter(
            (country) =>
                country.name.toLowerCase().includes(search.toLowerCase()) &&
                (selectedRegion === '' || country.region === selectedRegion)
        );
    }, [sortedCountries, search, selectedRegion]);

    const handleSort = useCallback((key: string) => {
        setSortOrder((prev) => (sortKey === key ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'));
        setSortKey(key);
    }, [sortKey]);

    const handleRegionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRegion(e.target.value);
    }, []);

    const toggleCountrySelection = useCallback((countryName: string) => {
        setSelectedCountries((prev) => {
            const updated = prev.includes(countryName) ? prev.filter((name) => name !== countryName) : [...prev, countryName];
            localStorage.setItem('selectedCountries', JSON.stringify(updated));
            return updated;
        });
    }, []);

    return (
        <div style={{ padding: '20px' }}>
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
