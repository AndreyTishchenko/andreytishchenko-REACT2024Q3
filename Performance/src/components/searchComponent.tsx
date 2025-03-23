import React from 'react';

interface SearchProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = React.memo(({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search countries..."
            value={value}
            onChange={onChange}
            className="mb-4 p-2 border rounded"
        />
    );
});

export default Search;
