import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config();

const app = express();
const port = 8001;

app.use(express.static(path.resolve("public")));

app.get("/generateQR/:location", async (req, res) => {
    const location = req.params.location;
    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${location}&aqi=no`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data, status: ${response.status}`);
        }
        const result = await response.json();
        res.status(200).json(result);  // Return the weather data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch data from the Weather API" });
    }
});


app.listen(port, () => {
   console.log(`Server connected to http://localhost:${port}`);
});
