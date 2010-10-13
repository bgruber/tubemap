// because IE8 doesn't have Array.filter...
if (!Array.prototype.filter)  
{  
  Array.prototype.filter = function(fun /*, thisp */)  
  {  
    "use strict";  
  
    if (this === void 0 || this === null)  
      throw new TypeError();  
  
    var t = Object(this);  
    var len = t.length >>> 0;  
    if (typeof fun !== "function")  
      throw new TypeError();  
  
    var res = [];  
    var thisp = arguments[1];  
    for (var i = 0; i < len; i++)  
    {  
      if (i in t)  
      {  
        var val = t[i]; // in case fun mutates this  
        if (fun.call(thisp, val, i, t))  
          res.push(val);  
      }  
    }  
  
    return res;  
  };  
}

var sound_dir = "sounds";
var audio_files = [{audio: "Algate.mp3",
                    x: 976, y: 313},
                   {audio: "Algate_East.mp3",
                    x: 1065, y: 295},
                   {audio: "Angel.mp3",
                    x: 763, y: 83},
                   {audio: "Baker_Street.mp3",
                    x: 339, y: 103},
                   {audio: "Bank.mp3",
                    x: 799, y: 312},
                   {audio: "Barbican.mp3",
                    x: 771, y: 181},
                   {audio: "Bayswater.mp3",
                    x: 114, y: 198},
                   {audio: "Blackfriars.mp3",
                    x: 660, y: 413},
                   {audio: "Bond_Street.mp3",
                    x: 316, y: 262},
                   {audio: "Borough.mp3",
                    x: 711, y: 639},
                   {audio: "Cannon_Street.mp3",
                    x: 741, y: 367},
                   {audio: "Chancery_Lane.mp3",
                    x: 674, y: 257},
                   {audio: "Charing_Cross.mp3",
                    x: 532, y: 428},
                   {audio: "Covent_Garden.mp3",
                    x: 578, y: 298},
                   {audio: "Earls_Court.mp3",
                    x: 82, y: 463},
                   {audio: "Edgware_Road.mp3",
                    x: 200, y: 107},
                   {audio: "Elephant_Castle.mp3",
                    x: 585, y: 758},
                   {audio: "Embankment.mp3",
                    x: 547, y: 479},
                   {audio: "Euston.mp3",
                    x: 569, y: 69},
                   {audio: "Euston_Square.mp3",
                    x: 582, y: 117},
                   {audio: "Farringdon.mp3",
                    x: 736, y: 132},
                   {audio: "Gloucester_Road.mp3",
                    x: 156, y: 459},
                   {audio: "Goodge_Street.mp3",
                    x: 527, y: 229},
                   {audio: "Great_Portland_Street.mp3",
                    x: 434, y: 101},
                   {audio: "Green_Park.mp3",
                    x: 335, y: 353},
                   {audio: "High_Street_Kensington.mp3",
                    x: 113, y: 341},
                   {audio: "Holborn.mp3",
                    x: 609, y: 262},
                   {audio: "Hyde_Park_Corner.mp3",
                    x: 297, y: 366},
                   {audio: "Kings_Cross.mp3",
                    x: 639, y: 54},
                   {audio: "Knightsbridge.mp3",
                    x: 260, y: 402},
                   {audio: "Lambeth_North.mp3",
                    x: 553, y: 696},
                   {audio: "Lancaster_Gate.mp3",
                    x: 227, y: 257},
                   {audio: "Leicester_Square.mp3",
                    x: 532, y: 339},
                   {audio: "Liverpool_Street.mp3",
                    x: 941, y: 214},
                   {audio: "London_Bridge.mp3",
                    x: 818, y: 509},
                   {audio: "Mansion_House.mp3",
                    x: 681, y: 379},
                   {audio: "Marble_Arch.mp3",
                    x: 268, y: 267},
                   {audio: "Marylebone.mp3",
                    x: 245, y: 127},
                   {audio: "Monument.mp3",
                    x: 852, y: 365},
                   {audio: "Moorgate.mp3",
                    x: 818, y: 195},
                   {audio: "Notting_Hill_Gate.mp3",
                    x: 107, y: 262},
                   {audio: "Old_Street.mp3",
                    x: 818, y: 119},
                   {audio: "Oxford_Circus.mp3",
                    x: 404, y: 262},
                   {audio: "Paddington.mp3",
                    x: 108, y: 153},
                   {audio: "Picadilly_Circus.mp3",
                    x: 458, y: 353},
                   {audio: "Pimlico.mp3",
                    x: 330, y: 647},
                   {audio: "Queensway.mp3",
                    x: 193, y: 266},
                   {audio: "Regents_Park.mp3",
                    x: 385, y: 165},
                   {audio: "Russell_Square.mp3",
                    x: 628, y: 187},
                   {audio: "Sloane_Square.mp3",
                    x: 281, y: 471},
                   {audio: "South_Kensington.mp3",
                    x: 189, y: 481},
                   {audio: "Southwark.mp3",
                    x: 612, y: 624},
                   {audio: "St_Jamess_Park.mp3",
                    x: 376, y: 471},
                   {audio: "St_Pauls.mp3",
                    x: 722, y: 282},
                   {audio: "Temple.mp3",
                    x: 620, y: 459},
                   {audio: "Tottenham_Court_Road.mp3",
                    x: 532, y: 262},
                   {audio: "Tower_Hill.mp3",
                    x: 964, y: 366},
                   {audio: "Vauxhall.mp3",
                    x: 356, y: 758},
                   {audio: "Victoria.mp3",
                    x: 335, y:479},
                   {audio: "Warren_Street.mp3",
                    x: 532, y: 134},
                   {audio: "Waterloo.mp3",
                    x: 532, y: 579},
                   {audio: "Westminster.mp3",
                    x: 462, y: 478}];

soundManager.url = './sm';
soundManager.useHTML5Audio = true;
soundManager.debugMode = true;
soundManager.debugFlash = true;

function Stop(id, stop) {
    this.id = id;
    this.x = stop.x;
    this.y = stop.y;
    this.on = false;
    this.buttonId = function() {
        return this.id + '_button';
    }
    this.makeSound = function() {
        this.sound = soundManager.createSound({
            id: id + '_audio',
            url: 'sounds/' + stop.audio,
            autoLoad: false,
            onplay: (function(o) {
                return function() {
                    $('#' + o.buttonId()).addClass('station-button-playing');
                }
            })(this),
            onfinish: (function(o) {
                return function() {
                    $('#' + o.buttonId()).removeClass('station-button-playing');
                }
            })(this)
        });
    }
}

var stops = [];
(function() {
    var id_prefix = 'stop';
    for(var i = 0; i != audio_files.length; i++) {
        stops[i] = new Stop(id_prefix+i, audio_files[i]);
    }
})();

var onstops = [];
var train_sounds = [];

$(function() {
    function makeToggler(j) {
        return function() {
            $(this).toggleClass('station-button-on');
            stops[j].on = !stops[j].on;
            if(stops[j].on) {
                onstops.push(stops[j]);
            }
            else {
                onstops = onstops.filter(function(e) {
                    return e.id != stops[j].id;
                });
            }
        }
    }

    for(var i = 0; i != stops.length; i++) {
        var button_id = stops[i].buttonId();
        $('#tubemap').append('<input type="button" class="station-button" id="' + button_id + '"/>');
        $('#' + button_id)
            .click(makeToggler(i))
            .css(
                {position: 'absolute',
                 top: stops[i].y,
                 left: stops[i].x});
    }
    
    $('#play_button').click(function() {
        $(this).attr('disabled', true);
        
        // i'm going to use shift, so copy the array first
        var o = onstops.slice(0);
        
        // load up all of the sounds
        $.each(o, function(i, x) { x.sound.load(); });
        
        // aaand start 'em playing
        playNext(o.shift(), o);
    });
});

soundManager.onload = function() {
    train_sounds = $.map([0,1,2,3,4,5,6,7,8,9,10],
                         function(i) {
                             return soundManager.createSound({
                                 id: 'train' + i,
                                 url: 'sounds/Tube' + (i + 1) + '.mp3',
                                 autoLoad: false });});
    $.each(stops, function(i, s) { s.makeSound() });
    $('#play_button').attr('disabled', false);
}

function playNext(s, stops) {
    var next;
    if (next = stops.shift()) {
        var trainSound = train_sounds.random_element();
        s.sound.play({onjustbeforefinish: function() {
            trainSound.play({onjustbeforefinish: function() {
                playNext(next, stops);
            }});
        }});
    } else {
        s.sound.play({onbeforefinishcomplete: function() {
            $('#play_button').attr('disabled', false);
        }});
    }
}

Array.prototype.random_element = function() {
    function getRandomInt(min, max)  
    {  
        return Math.floor(Math.random() * (max - min + 1)) + min;  
    }
    return this[getRandomInt(0, this.length - 1)];
}