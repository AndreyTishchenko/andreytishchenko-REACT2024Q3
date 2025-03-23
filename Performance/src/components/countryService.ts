export const fetchCountries = async (): Promise<any[]> => {
    const response = await fetch('https://restcountries.com/v2/all');
    return response.json();
};
