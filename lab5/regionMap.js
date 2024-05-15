// regionMap.js

export function regionMap(country) {
    const regionMapping = {
        // Europe
        "Albania": "Europe", "Andorra": "Europe", "Austria": "Europe",
        "Belarus": "Europe", "Belgium": "Europe", "Bosnia and Herzegovina": "Europe",
        "Bulgaria": "Europe", "Croatia": "Europe", "Cyprus": "Europe",
        "Czech Republic": "Europe", "Denmark": "Europe", "Estonia": "Europe",
        "Finland": "Europe", "France": "Europe", "Germany": "Europe",
        "Greece": "Europe", "Hungary": "Europe", "Iceland": "Europe",
        "Ireland": "Europe", "Italy": "Europe", "Kosovo": "Europe",
        "Latvia": "Europe", "Liechtenstein": "Europe", "Lithuania": "Europe",
        "Luxembourg": "Europe", "Malta": "Europe", "Moldova": "Europe",
        "Monaco": "Europe", "Montenegro": "Europe", "Netherlands": "Europe",
        "North Macedonia": "Europe", "Norway": "Europe", "Poland": "Europe",
        "Portugal": "Europe", "Romania": "Europe", "Russia": "Europe",
        "San Marino": "Europe", "Serbia": "Europe", "Slovakia": "Europe",
        "Slovenia": "Europe", "Spain": "Europe", "Sweden": "Europe",
        "Switzerland": "Europe", "Ukraine": "Europe", "United Kingdom": "Europe",
        "Vatican City": "Europe",
		
		// Asia
		"Afghanistan": "Asia", "Armenia": "Asia", "Azerbaijan": "Asia",
		"Bahrain": "Asia", "Bangladesh": "Asia", "Bhutan": "Asia",
		"Brunei": "Asia", "Cambodia": "Asia", "China": "Asia",
		"Georgia": "Asia", "India": "Asia", "Indonesia": "Asia",
		"Iran": "Asia", "Iraq": "Asia", "Israel": "Asia",
		"Japan": "Asia", "Jordan": "Asia", "Kazakhstan": "Asia",
		"Kuwait": "Asia", "Kyrgyzstan": "Asia", "Laos": "Asia",
		"Lebanon": "Asia", "Malaysia": "Asia", "Maldives": "Asia",
		"Mongolia": "Asia", "Myanmar": "Asia", "Nepal": "Asia",
		"North Korea": "Asia", "Oman": "Asia", "Pakistan": "Asia",
		"Palestine": "Asia", "Philippines": "Asia", "Qatar": "Asia",
		"Saudi Arabia": "Asia", "Singapore": "Asia", "South Korea": "Asia",
		"Sri Lanka": "Asia", "Syria": "Asia", "Taiwan": "Asia",
		"Tajikistan": "Asia", "Thailand": "Asia", "Timor-Leste": "Asia",
		"Turkey": "Asia", "Turkmenistan": "Asia", "United Arab Emirates": "Asia",
		"Uzbekistan": "Asia", "Vietnam": "Asia", "Yemen": "Asia",

		// North America
		"Antigua and Barbuda": "North America", "Bahamas": "North America",
		"Barbados": "North America", "Belize": "North America",
		"Canada": "North America", "Costa Rica": "North America",
		"Cuba": "North America", "Dominica": "North America",
		"Dominican Republic": "North America", "El Salvador": "North America",
		"Grenada": "North America", "Guatemala": "North America",
		"Haiti": "North America", "Honduras": "North America",
		"Jamaica": "North America", "Mexico": "North America",
		"Nicaragua": "North America", "Panama": "North America",
		"Saint Kitts and Nevis": "North America", "Saint Lucia": "North America",
		"Saint Vincent and the Grenadines": "North America",
		"Trinidad and Tobago": "North America", "United States": "North America",

		// South America
		"Argentina": "South America", "Bolivia": "South America",
		"Brazil": "South America", "Chile": "South America",
		"Colombia": "South America", "Ecuador": "South America",
		"Guyana": "South America", "Paraguay": "South America",
		"Peru": "South America", "Suriname": "South America",
		"Uruguay": "South America", "Venezuela": "South America",

		// Africa
		"Algeria": "Africa", "Angola": "Africa", "Benin": "Africa",
		"Botswana": "Africa", "Burkina Faso": "Africa", "Burundi": "Africa",
		"Cabo Verde": "Africa", "Cameroon": "Africa", "Central African Republic": "Africa",
		"Chad": "Africa", "Comoros": "Africa", "Congo, Democratic Republic of the": "Africa",
		"Congo, Republic of the": "Africa", "Djibouti": "Africa", "Egypt": "Africa",
		"Equatorial Guinea": "Africa", "Eritrea": "Africa", "Eswatini": "Africa",
		"Ethiopia": "Africa", "Gabon": "Africa", "Gambia": "Africa",
		"Ghana": "Africa", "Guinea": "Africa", "Guinea-Bissau": "Africa",
		"Ivory Coast": "Africa", "Kenya": "Africa", "Lesotho": "Africa",
		"Liberia": "Africa", "Libya": "Africa", "Madagascar": "Africa",
		"Malawi": "Africa", "Mali": "Africa", "Mauritania": "Africa",
		"Mauritius": "Africa", "Morocco": "Africa", "Mozambique": "Africa",
		"Namibia": "Africa", "Niger": "Africa", "Nigeria": "Africa",
		"Rwanda": "Africa", "Sao Tome and Principe": "Africa", "Senegal": "Africa",
		"Seychelles": "Africa", "Sierra Leone": "Africa", "Somalia": "Africa",
		"South Africa": "Africa", "South Sudan": "Africa", "Sudan": "Africa",
		"Tanzania": "Africa", "Togo": "Africa", "Tunisia": "Africa",
		"Uganda": "Africa", "Zambia": "Africa", "Zimbabwe": "Africa",

		// Australia and Oceania
		"Australia": "Oceania", "Fiji": "Oceania", "Kiribati": "Oceania",
		"Marshall Islands": "Oceania", "Micronesia": "Oceania",
		"Nauru": "Oceania", "New Zealand": "Oceania", "Palau": "Oceania",
		"Papua New Guinea": "Oceania", "Samoa": "Oceania", "Solomon Islands": "Oceania",
		"Tonga": "Oceania", "Tuvalu": "Oceania", "Vanuatu": "Oceania",
    };

    return regionMapping[country] || "Unknown";
}

