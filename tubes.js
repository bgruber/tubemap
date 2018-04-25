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

var overlap_time = 1000;
var initial_volume = 60;
var sound_dir = "sounds";
var audio_files = [{audio: "Algate.mp3",
                    x: 968, y: 305},
                   {audio: "Algate_East.mp3",
                    x: 1054, y: 284},
                   {audio: "Angel.mp3",
                    x: 755, y: 75},
                   {audio: "Baker_Street.mp3",
                    x: 328, y: 93},
                   {audio: "Bank.mp3",
                    x: 789, y: 302},
                   {audio: "Barbican.mp3",
                    x: 761, y: 171},
                   {audio: "Bayswater.mp3",
                    x: 104, y: 188},
                   {audio: "Blackfriars.mp3",
                    x: 649, y: 403},
                   {audio: "Bond_Street.mp3",
                    x: 305, y: 252},
                   {audio: "Borough.mp3",
                    x: 701, y: 629},
                   {audio: "Cannon_Street.mp3",
                    x: 731, y: 357},
                   {audio: "Chancery_Lane.mp3",
                    x: 666, y: 249},
                   {audio: "Charing_Cross.mp3",
                    x: 521, y: 417},
                   {audio: "Covent_Garden.mp3",
                    x: 568, y: 288},
                   {audio: "Earls_Court.mp3",
                    x: 71, y: 453},
                   {audio: "Edgware_Road.mp3",
                    x: 189, y: 95},
                   {audio: "Elephant_Castle.mp3",
                    x: 577, y: 750},
                   {audio: "Embankment.mp3",
                    x: 537, y: 469},
                   {audio: "Euston.mp3",
                    x: 559, y: 59},
                   {audio: "Euston_Square.mp3",
                    x: 572, y: 107},
                   {audio: "Farringdon.mp3",
                    x: 726, y: 122},
                   {audio: "Gloucester_Road.mp3",
                    x: 146, y: 450},
                   {audio: "Goodge_Street.mp3",
                    x: 520, y: 221},
                   {audio: "Great_Portland_Street.mp3",
                    x: 424, y: 90},
                   {audio: "Green_Park.mp3",
                    x: 324, y: 343},
                   {audio: "High_Street_Kensington.mp3",
                    x: 104, y: 332},
                   {audio: "Holborn.mp3",
                    x: 598, y: 252},
                   {audio: "Hyde_Park_Corner.mp3",
                    x: 289, y: 358},
                   {audio: "Kings_Cross.mp3",
                    x: 629, y: 45},
                   {audio: "Knightsbridge.mp3",
                    x: 252, y: 394},
                   {audio: "Lambeth_North.mp3",
                    x: 543, y: 686},
                   {audio: "Lancaster_Gate.mp3",
                    x: 219, y: 249},
                   {audio: "Leicester_Square.mp3",
                    x: 522, y: 329},
                   {audio: "Liverpool_Street.mp3",
                    x: 931, y: 205},
                   {audio: "London_Bridge.mp3",
                    x: 807, y: 499},
                   {audio: "Mansion_House.mp3",
                    x: 673, y: 371},
                   {audio: "Marble_Arch.mp3",
                    x: 260, y: 259},
                   {audio: "Marylebone.mp3",
                    x: 234, y: 117},
                   {audio: "Monument.mp3",
                    x: 842, y: 356},
                   {audio: "Moorgate.mp3",
                    x: 808, y: 185},
                   {audio: "Notting_Hill_Gate.mp3",
                    x: 97, y: 252},
                   {audio: "Old_Street.mp3",
                    x: 808, y: 109},
                   {audio: "Oxford_Circus.mp3",
                    x: 394, y: 252},
                   {audio: "Paddington.mp3",
                    x: 97, y: 142},
                   {audio: "Picadilly_Circus.mp3",
                    x: 448, y: 343},
                   {audio: "Pimlico.mp3",
                    x: 320, y: 637},
                   {audio: "Queensway.mp3",
                    x: 185, y: 258},
                   {audio: "Regents_Park.mp3",
                    x: 377, y: 157},
                   {audio: "Russell_Square.mp3",
                    x: 618, y: 177},
                   {audio: "Sloane_Square.mp3",
                    x: 273, y: 463},
                   {audio: "South_Kensington.mp3",
                    x: 178, y: 471},
                   {audio: "Southwark.mp3",
                    x: 602, y: 614},
                   {audio: "St_Jamess_Park.mp3",
                    x: 368, y: 463},
                   {audio: "St_Pauls.mp3",
                    x: 714, y: 274},
                   {audio: "Temple.mp3",
                    x: 610, y: 449},
                   {audio: "Tottenham_Court_Road.mp3",
                    x: 522, y: 252},
                   {audio: "Tower_Hill.mp3",
                    x: 954, y: 357},
                   {audio: "Vauxhall.mp3",
                    x: 346, y: 748},
                   {audio: "Victoria.mp3",
                    x: 323, y: 468},
                   {audio: "Warren_Street.mp3",
                    x: 522, y: 124},
                   {audio: "Waterloo.mp3",
                    x: 521, y: 569},
                   {audio: "Westminster.mp3",
                    x: 452, y: 468}];

soundManager.url = './sm';
soundManager.useHTML5Audio = true;
soundManager.debugMode = true;
soundManager.debugFlash = true;

function overlappingLoad(sound) {
    var onLoadOverlapQueue = function() {
        var overlapPosition = this.duration - overlap_time;
        this.onPosition(overlapPosition, function() {
            var next;
            if(next = this.overlapQueue.shift()) {
                next();
            }
        });
    };

    sound.overlapQueue = sound.overlapQueue || [];
    sound.load({onload: onLoadOverlapQueue});
}

function Stop(id, stop) {
    this.id = id;
    this.x = stop.x;
    this.y = stop.y;
    this.buttonId = function() {
        return this.id + '_button';
    };
    this.makeSound = function() {
        this.sound = soundManager.createSound({
            id: id + '_audio',
            url: 'sounds/' + stop.audio,
            autoLoad: false,
            volume: initial_volume,
            onplay: (function(o) {
                return function() {
                    function animateTrans() {
                        if(o.sound.playState == 1) {
                            $('#' + o.buttonId()).animate({opacity: 'toggle'}, {complete: animateTrans, duration: 1000});
                        } else {
                            $('#' + o.buttonId()).animate({opacity: 'show'});
                        }
                    }
                    animateTrans();
                };
            })(this)
        });
    };
    this.on = false;
    this.toggleOn = function() {
        this.on = !this.on;
        $('#' + this.buttonId()).toggleClass('station-button-on');
    };
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
            stops[j].toggleOn();
            if(stops[j].on) {
                onstops.push(stops[j]);
            }
            else {
                onstops = onstops.filter(function(e) {
                    return e.id != stops[j].id;
                });
            }
        };
    }

    for(var i = 0; i != stops.length; i++) {
        var button_id = stops[i].buttonId();
        $('#tubemap').append('<input type="button" class="station-button" id="' + button_id + '"/>');
        $('#' + button_id)
            .click(makeToggler(i))
            .css({position: 'absolute',
                  top: stops[i].y,
                  left: stops[i].x});
    }

    $('#clear_button').click(clearOnStops);

    $('#play_button').click(function() {
        $(this).attr('disabled', true);
        $('#clear_button').attr('disabled', true);

        var sounds = listOfSounds(onstops, train_sounds);
        playOverlappingSoundList(sounds);
    });

    $('#volume_slider').slider({
        min: 0,
        max: 100,
        value: initial_volume,
        disabled: true,
        slide: function(event, ui) {
            // possibility: keep track of whatever sounds are
            // currently playing and do those first.
            $.each(train_sounds, function(i, s) { s.setVolume(ui.value); });
            $.each(stops, function(i, s) { s.sound.setVolume(ui.value); });
        }
    });
});

soundManager.onload = function() {
    train_sounds = $.map([0,1,2,3,4,5,6,7,8,9,10],
                         function(i) {
                             return soundManager.createSound({
                                 id: 'train' + i,
                                 url: 'sounds/Tube' + (i + 1) + '.mp3',
                                 autoLoad: false });
                         });
    $.each(stops, function(i, s) { s.makeSound() });
    $('#play_button').attr('disabled', false);
    $('#volume_slider').slider('option', 'disabled', false);
};

function lastOnFinish() {
    $('#play_button').attr('disabled', false);
    $('#clear_button').attr('disabled', false);
    clearOnStops();
}

function listOfSounds(stops, allTrainSounds) {
    var sounds = [];
    for (var i = 0; i < stops.length - 1; i++) {  // don't handle the last stop
        var stop = stops[i];
        overlappingLoad(stop.sound);
        sounds.push(stop.sound);
        var ts = allTrainSounds.random_element();
        overlappingLoad(ts);
        sounds.push(ts);
    }
    var lastStop = stops[stops.length - 1];
    overlappingLoad(lastStop.sound);
    sounds.push(lastStop.sound);
    return sounds;
}

function playOverlappingSoundList(sounds) {
    function addOverlap(sound, nextSound) {
        sound.overlapQueue.push(function() { nextSound.play(); });
    }

    if (sounds.length > 1) {
        // don't handle the last 2 sounds in this loop
        for (var i = 0; i < sounds.length - 2; i++) {
            addOverlap(sounds[i], sounds[i + 1]);
        }

        var nextToLastSound = sounds[sounds.length - 2];
        var lastSound = sounds[sounds.length - 1];

        nextToLastSound.overlapQueue.push(function() {
            lastSound.play({onfinish: lastOnFinish});
        });

        sounds[0].play();
    } else {
        sounds[0].play({onfinish: lastOnFinish});
    }
}

function clearOnStops() {
    $.each(onstops, function(i, s) {
        s.toggleOn();
    });
    onstops = [];
}

Array.prototype.random_element = function() {
    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return this[getRandomInt(0, this.length - 1)];
}
