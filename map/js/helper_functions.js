
//LatLng to Tile coordinate conversion from http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
function long2tile(lon,zoom) { 
    return (Math.floor((lon+180)/360*Math.pow(2,zoom)/TILE_SIZE*256)); 
}
function lat2tile(lat,zoom) { 
    return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)/TILE_SIZE*256));
}

function tile2long(x,zoom) {
  return ((x/Math.pow(2,zoom)*360/256*TILE_SIZE-180));
}
function tile2lat(y,zoom) {
  var n=Math.PI-2*Math.PI*y/Math.pow(2,zoom)*TILE_SIZE/256;
  return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}
