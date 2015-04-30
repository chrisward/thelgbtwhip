"use strict";

var lgbtw = (lgbtw === undefined) ? {} : lgbtw;

lgbtw.settings = {
    apiBaseUrl: 'http://do-frankfurt1.homelinux.net/',
    lgbtwPickCandsUrl: 'http://thelgbtwhip.wardleton.homeip.net/search-panels.html?postcode='
};

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

lgbtw.urlParams = {
    postcode: getURLParameter('postcode')
}
