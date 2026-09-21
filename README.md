## Mobile Wetterstation 

1. Wetterdaten werden von ESP32 (LTE+GPS) an MQTT Broker gesendet

2. Diese Next.js Webanwendung holt sich diese Werte vom Broker und persistiert sie langfristig in einer Datenbank

3. In dieser [Live-Demo](https://lennard-langenbruch.github.io) sieht man die tabellarische Ansicht dieser Daten
