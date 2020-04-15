/* global L */
var Texasmap = L.map('map1').setView([31, -100], 6)
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png').addTo(Texasmap)
var AustinTX = L.marker([30.2672, 97.7431]).addTo(Texasmap)
var Laketravis = L.polygon([
  [30.43, -97.996],
  [30.46, -97.876],
  [30.35, -97.918]
]).addTo(Texasmap)
Laketravis.bindPopup('Lake Trvis, Autin,TX .')
AustinTX.bindPopup('Austin, TX.')
