function addControl(title, value, min, max) {
    $("#controls").append("<div class=\"col-xs-12\"><input id=\"control-" + title + "\" type=\"text\" value=\"0\" data-width=\"350\" data-height=\"350\"></div>");
    $("#control-" + title).knob({
        'min': min,
        'max': max,
        'change': function(v) {
            v = v / 100;
            $("#" + title).css({
                'opacity': v
            });
            if ($("#player-" + title)) {
                $("#player-" + title).prop("volume", v);
            }
        },
        'release': function() {
            //now persist the figures
        }
    });
    $("#control-" + title).val(value).trigger('change');
    $("#" + title).css({
        'opacity': value / 100
    });
    if ($("#player-" + title)) {
        $("#player-" + title).prop("volume", value / 100);
    }
}

function addApp(title, value, min, max, cssFile, audio) {
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "assets/css/" + cssFile
    }).appendTo("head");
    $("#apps").append("<div class=\"col-xs-12\">");
    $("#apps").append("<div class=\"" + title + "\"><div id=\"" + title + "\" class=\"" + title + "2\"> </div></div>");
    if (audio.length) {
        $("#apps").append("<div><audio id=\"player-" + title + "\" controls><source src=\"" + audio + "\" type=\"audio/mpeg\">Your browser does not support the audio element.</audio></div>");
    }
    $("#apps").append("</div>");
    addControl(title, value, min, max, audio);
}

$(document).ready(function() {
    $.get('House.xml', function(d) {
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