var sound_dir = "sounds";
var audio_files = [{audio: "Algate.mp3"},
                   {audio: "Algate_East.mp3"},
                   {audio: "Angel.mp3"},
                   {audio: "Baker_Street.mp3"},
                   {audio: "Bank.mp3"},
                   {audio: "Barbican.mp3"},
                   {audio: "Bayswater.mp3"},
                   {audio: "Blackfriars.mp3"},
                   {audio: "Bond_Street.mp3"},
                   {audio: "Borough.mp3"},
                   {audio: "Cannon_Street.mp3"},
                   {audio: "Chancery_Lane.mp3"},
                   {audio: "Charing_Cross.mp3"},
                   {audio: "Covent_Garden.mp3"},
                   {audio: "Earls_Court.mp3"},
                   {audio: "Edgware_Road.mp3"},
                   {audio: "Elephant_Castle.mp3"},
                   {audio: "Embankment.mp3"},
                   {audio: "Euston.mp3"},
                   {audio: "Euston_Square.mp3"},
                   {audio: "Farringdon.mp3"},
                   {audio: "Gloucester_Road.mp3"},
                   {audio: "Goodge_Street.mp3"},
                   {audio: "Great_Portland_Street.mp3"},
                   {audio: "Green_Park.mp3"},
                   {audio: "High_Street_Kensington.mp3"},
                   {audio: "Holborn.mp3"},
                   {audio: "Hyde_Park_Corner.mp3"},
                   {audio: "Kings_Cross.mp3"},
                   {audio: "Knightsbridge.mp3"},
                   {audio: "Lambeth_North.mp3"},
                   {audio: "Lancaster_Gate.mp3"},
                   {audio: "Leicester_Square.mp3"},
                   {audio: "Liverpool_Street.mp3"},
                   {audio: "London_Bridge.mp3"},
                   {audio: "Mansion_House.mp3"},
                   {audio: "Marble_Arch.mp3"},
                   {audio: "Marylebone.mp3"},
                   {audio: "Monument.mp3"},
                   {audio: "Moorgate.mp3"},
                   {audio: "Notting_Hill_Gate.mp3"},
                   {audio: "Old_Street.mp3"},
                   {audio: "Oxford_Circus.mp3"},
                   {audio: "Paddington.mp3"},
                   {audio: "Picadilly_Circus.mp3"},
                   {audio: "Pimlico.mp3"},
                   {audio: "Queensway.mp3"},
                   {audio: "Regents_Park.mp3"},
                   {audio: "Russell_Square.mp3"},
                   {audio: "Sloane_Square.mp3"},
                   {audio: "South_Kensington.mp3"},
                   {audio: "Southwark.mp3"},
                   {audio: "St_Jamess_Park.mp3"},
                   {audio: "St_Pauls.mp3"},
                   {audio: "Temple.mp3"},
                   {audio: "Tottenham_Court_Road.mp3"},
                   {audio: "Tower_Hill.mp3"},
                   {audio: "Tube1.mp3"},
                   {audio: "Tube10.mp3"},
                   {audio: "Tube11.mp3"},
                   {audio: "Tube2.mp3"},
                   {audio: "Tube3.mp3"},
                   {audio: "Tube4.mp3"},
                   {audio: "Tube5.mp3"},
                   {audio: "Tube6.mp3"},
                   {audio: "Tube7.mp3"},
                   {audio: "Tube8.mp3"},
                   {audio: "Tube9.mp3"},
                   {audio: "Vauxhall.mp3"},
                   {audio: "Victoria.mp3"},
                   {audio: "Warren_Street.mp3"},
                   {audio: "Waterloo.mp3"},
                   {audio: "Westminster.mp3"}];

soundManager.url = './sm';
soundManager.useHTML5Audio = true;

function Stop(id, filename) {
    this.id = id;
    this.audio = soundManager.createSound({
        id: id + '_audio',
        url: filename,
        autoLoad: true});
    this.on = false;
    this.buttonId = function() {
        return this.id + '_button';
    }
}

var stops = [];


$(function() {
    soundManager.onload = function() {
        var id_prefix = 'stop';
        for(var i = 0; i != audio_files.length; i++) {
            stops[i] = new Stop(id_prefix+i,
                                sound_dir + "/" + audio_files[i].audio);
        }

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
        }

        $('#play_button').click(function() {
            $(this).attr('disabled', true);
            onstops = stops.filter(function(e) { return e.on; });
            $.each(function(i, x) { x.audio.load(); });
            audioChain(onstops);
        });
    }
});

function audioChain(stops) {
    var current;
    if(current = stops.shift()) {
        current.audio.play();
        current.audio._onjustbeforefinish = function() {
            $('#'+current.buttonId()).removeClass('station-button-playing');
            audioChain(stops);
        };
        $('#'+current.buttonId()).addClass('station-button-playing');
    } else {
        $('#play_button').attr('disabled', false);
    }
}