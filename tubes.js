var sound_dir = "sounds";
var audio_files = [{audio: "Algate.ogg"},
                   {audio: "Algate_East.ogg"},
                   {audio: "Angel.ogg"},
                   {audio: "Baker_Street.ogg"},
                   {audio: "Bank.ogg"},
                   {audio: "Barbican.ogg"},
                   {audio: "Bayswater.ogg"},
                   {audio: "Blackfriars.ogg"},
                   {audio: "Bond_Street.ogg"},
                   {audio: "Borough.ogg"},
                   {audio: "Cannon_Street.ogg"},
                   {audio: "Chancery_Lane.ogg"},
                   {audio: "Charing_Cross.ogg"},
                   {audio: "Covent_Garden.ogg"},
                   {audio: "Earls_Court.ogg"},
                   {audio: "Edgware_Road.ogg"},
                   {audio: "Elephant_Castle.ogg"},
                   {audio: "Embankment.ogg"},
                   {audio: "Euston.ogg"},
                   {audio: "Euston_Square.ogg"},
                   {audio: "Farringdon.ogg"},
                   {audio: "Gloucester_Road.ogg"},
                   {audio: "Goodge_Street.ogg"},
                   {audio: "Great_Portland_Street.ogg"},
                   {audio: "Green_Park.ogg"},
                   {audio: "High_Street_Kensington.ogg"},
                   {audio: "Holborn.ogg"},
                   {audio: "Hyde_Park_Corner.ogg"},
                   {audio: "Kings_Cross.ogg"},
                   {audio: "Knightsbridge.ogg"},
                   {audio: "Lambeth_North.ogg"},
                   {audio: "Lancaster_Gate.ogg"},
                   {audio: "Leicester_Square.ogg"},
                   {audio: "Liverpool_Street.ogg"},
                   {audio: "London_Bridge.ogg"},
                   {audio: "Mansion_House.ogg"},
                   {audio: "Marble_Arch.ogg"},
                   {audio: "Marylebone.ogg"},
                   {audio: "Monument.ogg"},
                   {audio: "Moorgate.ogg"},
                   {audio: "Notting_Hill_Gate.ogg"},
                   {audio: "Old_Street.ogg"},
                   {audio: "Oxford_Circus.ogg"},
                   {audio: "Paddington.ogg"},
                   {audio: "Picadilly_Circus.ogg"},
                   {audio: "Pimlico.ogg"},
                   {audio: "Queensway.ogg"},
                   {audio: "Regents_Park.ogg"},
                   {audio: "Russell_Square.ogg"},
                   {audio: "Sloane_Square.ogg"},
                   {audio: "South_Kensington.ogg"},
                   {audio: "Southwark.ogg"},
                   {audio: "St_Jamess_Park.ogg"},
                   {audio: "St_Pauls.ogg"},
                   {audio: "Temple.ogg"},
                   {audio: "Tottenham_Court_Road.ogg"},
                   {audio: "Tower_Hill.ogg"},
                   {audio: "Tube1.ogg"},
                   {audio: "Tube10.ogg"},
                   {audio: "Tube11.ogg"},
                   {audio: "Tube2.ogg"},
                   {audio: "Tube3.ogg"},
                   {audio: "Tube4.ogg"},
                   {audio: "Tube5.ogg"},
                   {audio: "Tube6.ogg"},
                   {audio: "Tube7.ogg"},
                   {audio: "Tube8.ogg"},
                   {audio: "Tube9.ogg"},
                   {audio: "Vauxhall.ogg"},
                   {audio: "Victoria.ogg"},
                   {audio: "Warren_Street.ogg"},
                   {audio: "Waterloo.ogg"},
                   {audio: "Westminster.ogg"}];

function Stop(id, filename) {
    this.id = id;
    this.audio = new Audio(filename);
    this.on = false;
    this.buttonId = function() {
        return this.id + '_button';
    }
}

var stops = [];
(function() {
    var id_prefix = 'stop';
    for(var i = 0; i != audio_files.length; i++) {
        stops[i] = new Stop(id_prefix+i,
                            sound_dir + "/" + audio_files[i].audio);
    }
})();

$(function() {
    for(var i = 0; i != stops.length; i++) {
        var button_id = stops[i].buttonId();
        $('#tubemap').append('<input type="button" class="station-button" id="' + button_id + '"/>');
        function makeToggler(j) {
            return function() {
                $(this).toggleClass('station-button-on');
                stops[j].on = !stops[j].on;
            }
        }
        $('#' + button_id).click(makeToggler(i));
        $('#tubemap').append(stops[i].audio);
    }

    $('#play_button').click(function() {
        $(this).attr('disabled', true);
        onstops = stops.filter(function(e) { return e.on; });
        $.each(function(i, x) { x.audio.load(); });
        audioChain(onstops);
    });
})

function audioChain(stops) {
    var current;
    if(current = stops.shift()) {
        current.audio.addEventListener('ended', function() {
                $('#'+current.buttonId()).removeClass('station-button-playing');
                audioChain(stops);
            });
        $('#'+current.buttonId()).addClass('station-button-playing');
        current.audio.play();
    } else {
        $('#play_button').attr('disabled', false);
    }
}