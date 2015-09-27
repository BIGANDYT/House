/**
 * Add a control to the page
 *
 * @class addControl
 * @constructor
 * @param {string} title - The title of the control.
 * @param {string} value - The author of the book.
 * @param {string} min - The minimum value that can be set by the control.
 * @param {string} max - The maximum value that can be set by the control.
 */
function addControl(title, value, min, max) {
	// add the input form tag to the page that will be used by the jquery-knob jquery plugin control
    $("#controls").append("<div class=\"col-xs-12\"><input id=\"control-" + title + "\" type=\"text\" value=\"0\" data-width=\"350\" data-height=\"350\"></div>");
    // initialise the control
	$("#control-" + title).knob({
        'min': min,
        'max': max,
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
    $("#control-" + title).val(value).trigger('change');
    $("#" + title).css({
        'opacity': value / max
    });
    if ($("#player-" + title)) {
        $("#player-" + title).prop("volume", value / max);
    }
}

/**
 * Add an app to the page
 *
 * @class addApp
 * @constructor
 * @param {string} title - The title of the control.
 * @param {string} value - The author of the book.
 * @param {string} min - The minimum value that can be set by the control.
 * @param {string} max - The maximum value that can be set by the control.
 * @param {string} cssFile - The cssFile that is required to show the app.
 * @param {string} audio - corresponding audio file required by the app.
 */
function addApp(title, value, min, max, cssFile, audio) {
	// if the app comes shipped with a cssFile then add it to the head of the page
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "assets/css/" + cssFile
    }).appendTo("head");
	// add the app to the page
    $("#apps").append("<div class=\"col-xs-12\">");
    $("#apps").append("<div class=\"" + title + "\"><div id=\"" + title + "\" class=\"" + title + "2\"> </div></div>");
    // if we have an audio file then add a html5 player to the page aswell
	if (audio.length) {
        $("#apps").append("<div><audio id=\"player-" + title + "\" controls><source src=\"" + audio + "\" type=\"audio/mpeg\">Your browser does not support the audio element.</audio></div>");
    }
	// now add the apps control
    addControl(title, value, min, max, audio);
}

/**
 * Initialise the page
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
            var cssFile = $('cssFile', $app).text();
            var audio = $('audio', $app).text();
            addApp(title, value, min, max, cssFile, audio);
        });
    });
});