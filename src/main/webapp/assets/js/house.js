/**
 * Initialise the page by getting the xml deinition file and retreiving the apps and values
 * 
 @main init
 */
$(document).ready(function() {
	// When the page loads get the house.xml to get the apps to display and their default values
    $.get('House.xml', function(d) {
		// for each app in the xml definition loop through, retrieve the metadata and add an app to the page
        $(d).find("app").each(function() {
            var $app = $(this);
            var title = $('title', $app).text();
            var value = $('value', $app).text();
            var min = $('min', $app).text();
            var max = $('max', $app).text();
            var image = $('image', $app).text();
			var audio = $('audio', $app).text();
			var controlwidth = $('controlwidth', $app).text();
			var controlheight = $('controlheight', $app).text();
			var controlcolor = $('controlcolor', $app).text();
            addApp(title, value, min, max, image, audio, controlwidth, controlheight, controlcolor);
        });
    });
});

/**
 * Add an app to the page
 *
 * @class addApp
 * @constructor
 * @param {string} title - The title of the control.
 * @param {string} value - The author of the book.
 * @param {string} min - The minimum value that can be set by the control.
 * @param {string} max - The maximum value that can be set by the control.
 * @param {string} image - corresponding image file required by the app.
 * @param {string} audio - corresponding audio file required by the app.
 * @param {string} controlwidth - The width of the control.
 * @param {string} controlheight - The height of the control.
 * @param {string} controlcolor - The colour of the control.
 */
function addApp(title, value, min, max, image, audio, controlwidth, controlheight, controlcolor) {	
	// add the app to the page
    $("#apps").append("<div class=\"col-xs-12\">");
    $("#apps").append("<div class=\"app\" style=\"background: url(" + image + ") no-repeat -150px 0;\"><div id=\"" + title + "\" class=\"app2\" style=\"background: url(" + image + ") no-repeat 0 0;\"> </div></div>");
    // if we have an audio file then add a html5 player to the page aswell
	if (audio.length) {
        $("#apps").append("<div><audio id=\"player-" + title + "\" controls><source src=\"" + audio + "\" type=\"audio/mpeg\">Your browser does not support the audio element.</audio></div>");
    }
	// now add the apps control
    addControl(title, value, min, max, controlwidth, controlheight, controlcolor);
}

/**
 * Add a control to the page
 *
 * @class addControl
 * @constructor
 * @param {string} title - The title of the control.
 * @param {string} value - The author of the book.
 * @param {string} min - The minimum value that can be set by the control.
 * @param {string} max - The maximum value that can be set by the control.
 * @param {string} controlwidth - The width of the control.
 * @param {string} controlheight - The height of the control.
 * @param {string} controlcolor - The colour of the control.
 */
function addControl(title, value, min, max, controlwidth, controlheight, controlcolor) {
	// add the input form tag to the page that will be used by the jquery-knob jquery plugin control
    $("#controls").append("<div class=\"col-xs-12\"><input id=\"control-" + title + "\" type=\"text\" value=\"0\" data-width=\"" + controlwidth + "\" data-height=\"" + controlheight + "\"></div>");
    // initialise the control
	$("#control-" + title).knob({
        'min': min,
        'max': max,
		'fgColor' : controlcolor,
		// when the value changes change the apps opacity to give the on off effect
        'change': function(v) {
            v = v / max;
            $("#" + title).css({
                'opacity': v
            });
			// if this app has a audio file also change the volume
            if ($("#player-" + title)) {
                $("#player-" + title).prop("volume", v);
            }
        },
		// when the value is set trigger a call to the server to update the xml definition file
        'release': function() {
            //TODO: now persist the figures back to house.xml, the test asks not to use server side code, but would simply do an ajax call to the server to update the file.
        }
    });
	//set the controls start value
    $("#control-" + title).val(value).trigger('change');
	// set the apps start opacity
    $("#" + title).css({
        'opacity': value / max
    });
	// set the players start volume if present
    if ($("#player-" + title)) {
        $("#player-" + title).prop("volume", value / max);
    }
}
