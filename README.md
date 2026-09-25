# Mobile Wetterstation 

##  [Live-Demo](https://lennard-langenbruch.github.io)

<img width="2560" height="1253" alt="grafik" src="https://github.com/user-attachments/assets/2a960bd9-8ca1-4601-bdd0-2985b8d76b57" />
<p><sub><i>https://lennard-langenbruch.github.io</i></sub></p>

<br>

## Mikrocontroller (MCU)
<img width="832" height="302" alt="grafik" src="https://github.com/user-attachments/assets/e44684ca-1b41-4f40-a3e6-22fdecb24314" />

<p><sub><i>Modell T-SIM7000G der Firma <a href="https://wiki.lilygo.cc/zh/products/t-sim-series/t-sim7000">LILYGO</a></i></sub></p>

<br>

## Kommunikation
<p>Die Wetterstation (MCU) sendet ein JSON-Payload (publish) an den MQTT-Broker.</p>
<p>Eine minimale, separate Adapter-Anwendung (Node.js) wird darüber benachrichtigt (subscribe) und speichert diese Daten in einer relationalen Datenbank.</p>
<p>Diese Webanwendung (Next.js) stellt die Daten aus der Datenbank tabellarisch dar und hat ebenfalls ein Abonnement (subscribe) auf denselben MQTT-Broker für die Live-Ansicht.</p>

<img width="768" height="423" alt="grafik" src="https://github.com/user-attachments/assets/31517cd1-e306-46d7-a499-dcf45fc47ffd"/>
<p><sub><i>Diagram created with <a href="https://www.drawio.com">draw.io</a></i></sub></p>
