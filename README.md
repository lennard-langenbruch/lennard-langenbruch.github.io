# Mobile Wetterstation 

##  [Live-Demo](https://lennard-langenbruch.github.io)

<img width="2560" height="1253" alt="grafik" src="https://github.com/user-attachments/assets/2a960bd9-8ca1-4601-bdd0-2985b8d76b57" />





## Kommunikation
<p>Die Wetterstation (MCU) sendet ein JSON-Payload (publish) an den MQTT-Broker.</p>
<p>Eine minimale, separate Adapter-Anwendung (Node.js) wird darüber benachrichtigt (subscribe) und speichert diese Daten in einer relationalen Datenbank.</p>
<p>Diese Webanwendung (Next.js) stellt die Daten aus der Datenbank tabellarisch dar und hat ebenfalls ein Abonnement (subscribe) auf denselben MQTT-Broker für die Live-Ansicht.</p>

<img width="768" height="423" alt="grafik" src="https://github.com/user-attachments/assets/31517cd1-e306-46d7-a499-dcf45fc47ffd"/>
<p><sub><i>Diagram created with <a href="https://www.drawio.com">draw.io</a></i></sub></p>
