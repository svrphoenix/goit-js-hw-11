// const BASE_URL = 'https://restcountries.com/v3.1/name/';

// export const fetchCountries = function (name) {
//   const url = `${BASE_URL}${name}?fields=name,capital,population,flags,languages`;
//   return fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
// }