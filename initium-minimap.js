// ==UserScript==
// @name            initium-minimap
// @namespace       https://github.com/EFox2413/initiumGrease
// @version         0.1.0.0
// @updateURL       https://raw.githubusercontent.com/EFox2413/initiumGrease/master/initium-minimap.js
// @downloadURL     https://raw.githubusercontent.com/EFox2413/initiumGrease/master/initium-minimap.js
// @supportURL      https://github.com/EFox2413/initiumGrease/issues
// @match           https://www.playinitium.com/*
// @match           http://www.playinitium.com/*
// @grant           none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var script = document.createElement("script");
script.src = "https://s3.amazonaws.com/imappy/openseadragon/openseadragon.min.js";
document.getElementsByTagName("head")[0].appendChild(script);



function mapPopup(title, content, noBackground) {
    var noBackgroundHtml = "";
    if (noBackground==true)
        noBackgroundHtml = 'style="background:none"';
    window.popupsNum++;
    window.popupsOpen++;
    window.popupsArray[popupsNum-1] = "yes";
    $("#popups").show();
    var currentPopups = $("#popups").html();
    $("#popups").html(currentPopups + '<div id="popupWrapperBackground_' + popupsNum + '" class="popupWrapperBackground"><div id="popupWrapper_' + popupsNum + '" class="popupWrapper"><div id="popup_' + popupsNum + '" class="page-popup" '+noBackgroundHtml+'><div id="popup_header_' + popupsNum + '" class="popup_header">' + title + '</div><div id="popup_body_' + popupsNum + '" class="popup_body"><div id="popup_text_' + popupsNum + '" class=""><p>' + content + '</p></div></div><div id="popup_footer_' + popupsNum + '" class="popup_footer"><div id="popup_footer_okay_' + popupsNum + '" class="popup_message_okay" unselectable="on" onClick="closepopupMessage(' + popupsNum + ')" title="okay">Okay</div></div></div></div></div>');
    enterPopupClose();
}

var viewer;

function openMap() {
    if ($( '#map-container').length > 0) {
        console.log("Map already open!")
    } else if (disableShortcuts==false) {
        mapPopup("Initium Map", '<div style="height: 500px; max-width: 750px;width: 100vw;" id="map-container"></div>')

        viewer = OpenSeadragon({
            id: "map-container",
            prefixUrl: "https://s3.amazonaws.com/imappy/openseadragon/images/",
            springStiffness: 5,
            animationTime: 0.2,
            tileSources: {
                Image: {
                    xmlns:    "http://schemas.microsoft.com/deepzoom/2008",
                    Url:      "https://s3.amazonaws.com/imappy/initium_map/",
                    Format:   "jpg",
                    Overlap:  "1",
                    TileSize: "254",
                    Size: {
                        Height: "3093",
                        Width:  "7024"
                    }
                }
            }
        });
    }
}

$(document).on("keydown", function(event) {
    if (event.which == 78) {
        if ($(':focus').length > 0) {
            if (!($(':focus')[0].localName == "input")) {
                openMap();
            }
        } else {
            openMap();
        }
    }
});
