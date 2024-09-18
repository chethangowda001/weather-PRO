async function locationData() {
    const locInput = document.getElementById("inputValue").value;

    try {
        const response = await fetch(`/generateQR/${encodeURIComponent(locInput)}`);
        const res_data = await response.json();

        // Build the weather information dynamically
        const weatherHTML = `
            <h2>Weather for ${res_data.location.name}, ${res_data.location.country}</h2>
            <p>Temperature: ${res_data.current.temp_c} °C</p>
            <p>Condition: ${res_data.current.condition.text}</p>
            <p>Wind: ${res_data.current.wind_kph} kph</p>
            <p>condition: ${res_data.current.humidity}%</p>
            <p>Humidity: ${res_data.current.condition.text}%</p>
            <img src="${res_data.current.condition.icon}" alt="Weather Icon" />
        `;

        document.getElementById("data").innerHTML = weatherHTML;
    } catch (error) {
        document.getElementById("data").innerHTML = "Error fetching weather data.";
    }
}
