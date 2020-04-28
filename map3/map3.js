var map3 = L.map('map3').setView([31, -100], 4)
var statesLayerObject = L.layerGroup().addTo(map3)
var grayBasemapObject = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(map3)
var URL = 'https://geog4046.github.io/assignment-resources/data/us_state_demographics_ESRI_2010A.geojson'
var streetsBasemapObject = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(map3)
var basemapsObject = {
  'streets': streetsBasemapObject,
  'Gray canvas': grayBasemapObject
}
jQuery.getJSON(URL, function (data) {
  var map3style = function (feature) {
    var medpop = feature.properties.POPULATION
    var map3color = 'olive'
    if (medpop < 6458430) { map3color = 'green' }
    return {
      color: map3color,
      weight: 1,
      fillOpacity: 0.5
    }
  }
  var popup = {
    style: map3style,
    onEachFeature: feature1
  }
  L.geoJSON(data, popup).addTo(map3)
})
var feature1 = function (feature, layer) {
  var name = feature.properties.STATE_NAME
  var population = feature.properties.POPULATION
  layer.bindPopup('Median population of ' + name + ': ' + population + '<br>National average: 6458430')
  statesLayerObject.addLayer(layer)
}
var layersObject = {
  'Median population by state': statesLayerObject
}
L.control.layers(basemapsObject, layersObject).addTo(map3)
