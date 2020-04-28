var map3 = L.map('map3').setView([32.18, -99.14], 4)
var statesLayerObject = L.layerGroup().addTo(map3)
var grayBasemapObject = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(map3)
var renameThisUrl = 'https://geog4046.github.io/assignment-resources/data/us_state_demographics_ESRI_2010A.geojson'
var streetsBasemapObject = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(map3)
var basemapsObject = {
  'Streets': streetsBasemapObject,
  'Gray canvas': grayBasemapObject
}
jQuery.getJSON(renameThisUrl, function (data) {
  var renameThisStyleFunction = function (feature) {
    var renameThisAgeInteger = feature.properties.MED_AGE 
    var renameThisColorString = 'olive'
    if (renameThisAgeInteger < 38) { renameThisColorString = 'green' }
    return {
      color: renameThisColorString,
      weight: 1,
      fillOpacity: 0.5
    }
  }
  var renameThisGeojsonOptionsObject = {
    style: renameThisStyleFunction,
    onEachFeature: renameThisOnEachFeatureFunction
  }
  L.geoJSON(data, renameThisGeojsonOptionsObject).addTo(map3
})
var renameThisOnEachFeatureFunction = function (feature, layer) {
  var name = feature.properties.STATE_NAME
  var age = feature.properties.MED_AGE
  layer.bindPopup('Median age of ' + name + ': ' + age + '<br>National average: 38')
  statesLayerObject.addLayer(layer)
}
var layersObject = {
  'Median age by state': statesLayerObject
}
L.control.layers(basemapsObject, layersObject).addTo(map3)
