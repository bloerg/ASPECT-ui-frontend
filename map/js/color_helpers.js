
function redshift_to_color(min_redshift, max_redshift, redshift) {

    if ( redshift == null || redshift == -9999.0 ) return 'rgba(0,0,0,0)'
    else if ( redshift > max_redshift) return 'hsl(300, 90%,50%)'
    else {
        var color = (redshift - min_redshift)  * 300 / (max_redshift - min_redshift); //normalize to violett (300)
        return 'hsl(' + color + ',90%,50%)'
    }
}

function sn_median_to_color(min_sn_median, max_sn_median, sn_median) {
    if ( sn_median == null) return 'rgba(0,0,0,0)'
    else if (sn_median < 3) return 'hsl(' + 0 + ',50%,50%)'
    else if (sn_median < 10) return 'hsl(' + 40 + ',90%,50%)'
    else if (sn_median < 20) return 'hsl(' + 60 + ',90%,50%)'
    else if (sn_median < 30) return 'hsl(' + 120 + ',90%,50%)'
    else if (sn_median < 40) return 'hsl(' + 180 + ',90%,50%)'
    else if (sn_median < 50) return 'hsl(' + 240 + ',90%,50%)'
    else return 'hsl(' + 300 + ',90%,50%)'
    //~ else {
        //~ var color = (sn_median - min_sn_median)  * 300 / (max_sn_median - min_sn_median); //normalize to violett (300)
        //~ return 'hsl(' + color + ',50%,50%)'
    //~ }
}

function spec_class_to_color(spec_class) {
    if (spec_class == "S".charCodeAt(0)) return '#d95f02'
    else if (spec_class == "G".charCodeAt(0)) return '#1b9e77'
    else if (spec_class == "Q".charCodeAt(0)) return '#7570b3'
    else return 'rgba(0,0,0,0)'
}
