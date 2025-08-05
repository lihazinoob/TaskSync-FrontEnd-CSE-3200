export async function fetchCountryInformations() {
  const res = await fetch("https://flagcdn.com/en/codes.json");
  const data = await res.json(); // e.g. { "US":"United States", "BD":"Bangladesh", ... }
  const countryInformation = Object.entries(data).map(([code, name]) => ({
    value: code,
    label: name,
    flag: `https://flagcdn.com/w40/${code.toLowerCase()}.png`,
  }));
  return countryInformation;
}
