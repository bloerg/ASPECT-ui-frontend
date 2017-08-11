
//LatLng to Tile coordinate conversion from http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
function long2tile(lon,zoom) { 
    return (Math.floor((lon+180)/360*Math.pow(2,zoom)/TILE_SIZE*256)); 
};

function lat2tile(lat,zoom) { 
    return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)/TILE_SIZE*256));
};

function tile2long(x,zoom) {
  return ((x/Math.pow(2,zoom)*360/256*TILE_SIZE-180));
};

function tile2lat(y,zoom) {
  var n=Math.PI-2*Math.PI*y/Math.pow(2,zoom)*TILE_SIZE/256;
  return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
};

function goto_map_coordinate(som_x, som_y) {
    map.panTo( new L.LatLng( tile2lat(som_y,MAX_ZOOM), tile2long(som_x,MAX_ZOOM)) );
};

function importObjectList(importFileList) {
        var objectTableBody = document.querySelector('#objectTableBody');
        objectTableBody.innerHTML = '';
        Papa.parse(
            importFileList[0], 
            { 
                header: true,
                skipEmptyLines: true,
                step: function(results, parser) 
                {

                    //~ var objectTableBody = document.querySelector('#objectTableBody');
                    var td_index = document.createElement('td');
                    var td_name = document.createElement('td');
                    var td_som_x = document.createElement('td');
                    var td_som_y = document.createElement('td');
                    var td_mjd = document.createElement('td');
                    var td_plate = document.createElement('td');
                    var td_fiberid = document.createElement('td');
                    var tr = document.createElement('tr');
                    td_index.innerHTML = results.data[0].index || '';
                    td_name.innerHTML = results.data[0].name || '';
                    td_som_x.innerHTML = results.data[0].som_x  || '';
                    td_som_y.innerHTML = results.data[0].som_y || '';
                    td_mjd.innerHTML = results.data[0].mjd || '';
                    td_plate.innerHTML = results.data[0].plate || '';
                    td_fiberid.innerHTML = results.data[0].fiberid || '';
                    tr.appendChild(td_index);
                    tr.appendChild(td_name);
                    tr.appendChild(td_mjd);
                    tr.appendChild(td_plate);
                    tr.appendChild(td_fiberid);
                    addEvent(
                        tr,
                        'click',
                        function() {
                            this.style.backgroundColor = "#ff0000";
                            L.marker(
                                new L.LatLng( 
                                    tile2lat(parseInt(this.childNodes[3].innerText) + 0.1,MAX_ZOOM), 
                                    tile2long(parseInt(this.childNodes[2].innerText) + 0.1,MAX_ZOOM)
                                )
                            )
                            .on('click', function(e) {
                                map.removeLayer(this)
                            })
                            .addTo(map);
                            goto_map_coordinate(this.childNodes[2].innerText, this.childNodes[3].innerText);

                        }
                    );

                    if (
                          (td_som_x.innerHTML == '' || td_som_y.innerHTML == '')
                           && td_mjd.innerHTML != '' && td_mjd.innerHTML != -1
                           && td_plate.innerHTML != '' && td_plate.innerHTML != -1
                           && td_fiberid.innerHTML != '' && td_fiberid.innerHTML != -1
                    ) {
                        $.ajax({
                            url: "./sdss_to_som/" + td_mjd.innerHTML + "/" + td_plate.innerHTML + "/" + td_fiberid.innerHTML,
                            type: "GET",
                            dataType: "json",
                            async: true,
                            success: function(data) {
                                td_som_x.innerHTML = data.som_x;
                                td_som_y.innerHTML = data.som_y;
                                tr.insertBefore(td_som_x, tr.childNodes[2]);
                                tr.insertBefore(td_som_y, tr.childNodes[3]);
                                objectTableBody.appendChild(tr)

                            },
                            error: function(status) {
                                console.log(status);
                            }
                        });
                    }
                    else {
                        tr.insertBefore(td_som_x, tr.childNodes[2]);
                        tr.insertBefore(td_som_y, tr.childNodes[3]);
                        objectTableBody.appendChild(tr)
                    }

                }
            }
        )
    }

function makeUserSelection(layer, som_x, som_y) {
    if (layer.options.user_defined_layer_members[som_x]) {
        if (layer.options.user_defined_layer_members[som_x][som_y]) {
            delete layer.options.user_defined_layer_members[som_x][som_y];
        }
        else layer.options.user_defined_layer_members[som_x][som_y] = true;
    }
    else {
        layer.options.user_defined_layer_members[som_x] = [];
        layer.options.user_defined_layer_members[som_x][som_y] = true;					    
    };
}
