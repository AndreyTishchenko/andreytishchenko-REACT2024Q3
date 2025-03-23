interface SortSelectProps {
    regions: string[];
    selectedRegion: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ regions, selectedRegion, onChange }) => {
    return (
        <select 
            onChange={onChange} 
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
    );
};

export default SortSelect;
