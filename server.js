
import http from 'http';
import { parse } from 'url';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const PORT = process.env.PORT || 3000;
const AUTHOR = 'Krzysztof Ksiezki';
const apiKey = "3c102253117109da4cb086ce3a9de490" // Klucz API OpenWeatherMap

//wyswietlanie na konsoli
console.log(`Data uruchomienia: ${new Date().toISOString()}`);
console.log(`Autor: ${AUTHOR}`);
console.log(`PORT: ${PORT}`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serwer HTTP
const server = http.createServer(async (req, res) => {
    const { pathname, query } = parse(req.url, true);
    if (pathname === '/') {
        //serwowanie pliku frontendu (index.html)
        const filePath = path.join(__dirname, 'public', 'index.html');
        try {
            const content = await readFile(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(content);
        } catch (e) {
            res.writeHead(500);
            res.end('Błąd serwera');
        }
        // Obsługa endpointu
    } else if (pathname.startsWith('/weather')) {
        const { country, city } = query;
        if (!country || !city) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({ error: 'Brak parametru country lub city' }));
            return;
        }
        try {
            //URL do API OpenWeatherMap
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},${encodeURIComponent(country)}&units=metric&appid=${apiKey}&lang=pl`;
            const apiRes = await fetch(url);
            if (!apiRes.ok) throw new Error();
            const data = await apiRes.json();
            // zwracanie danych pogodowych do klienta
            res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify(data));
        } catch {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({ error: 'Błąd serwera' }));
        }
    } else {
        res.writeHead(404);
        res.end('Nie znaleziono');
    }
});
// Uruchomienie serwera
server.listen(PORT, () => {
    console.log(`Aplikacja działa pod adresem http://localhost:${PORT}`);
});