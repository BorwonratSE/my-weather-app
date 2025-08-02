document.getElementById("search-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const city = document.getElementById("city-input").value.trim();
    const weatherContainer = document.getElementById("weather-info-container");
    weatherContainer.innerHTML = "กำลังโหลด...";

    const apiKey = "0228b57aec4b75d2e0d634961aff53b4";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=th`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("ไม่พบข้อมูลเมืองที่ค้นหา");
        }

        const data = await response.json();
        weatherContainer.innerHTML = `
            <div class="city-name"><strong>${data.name}, ${data.sys.country}</strong></div>
            <div class="temp">${data.main.temp.toFixed(1)}°C</div>
            <div class="description">${data.weather[0].description}</div>
            <div class="humidity">ความชื้น: ${data.main.humidity}%</div>
            <div class="wind">ลม: ${data.wind.speed} m/s</div>
        `;
    } catch (error) {
        weatherContainer.innerHTML = `<div class="error">${error.message}</div>`;
    }
});
