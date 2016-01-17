"use strict";

var figi = require( "../lib/figi.js" ).default;

var sTestStringOne = "Hi, I love using emoticons ;) ! Sometimes, I :smile:, sometimes I :'(... But I always use figi :D !";
var sTestStringTwo = "Hi, I love using emoticons ;) !\nSometimes, I :smile:, sometimes I :'(...\nBut I always use figi :D !";
var oSimpleCatalog = {
    ";)": "wink.png",
    ":D": "lol.png",
    ":'(": "cry.png"
};

function isEmptyObject(obj) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}

exports[ "figi : default config options" ] = {
    "figi.catalog": function( test ) {
        test.equal( isEmptyObject( figi.catalog ), isEmptyObject( {} ), "should be an empty object" );
        test.done();
    },
    "figi.classes": function( test ) {
        test.equal( figi.classes, "emote", "should be 'emote'" );
        test.done();
    },
    "figi.path": function( test ) {
        test.equal( figi.path, "./", "should be './'" );
        test.done();
    },
    "figi.replacer": function( test ) {
        test.equal( typeof figi.replacer, "function", "should be a function" );
        test.equal( figi.replacer.call( figi, "test", "test" ), '<img src="./test" alt="test" class="emote" />', "should returns '<img src=\"./test\" alt=\"test\" class=\"emote\" />'" );
        test.done();
    }
};

exports[ "figi : no catalog" ] = {
    "figi( string ) with no catalog": function( test ) {
        test.equal( figi( sTestStringOne ), sTestStringOne, "should be the same string." );
        test.equal( figi( sTestStringTwo ), sTestStringTwo, "should be the same string." );

        test.done();
    }
};

exports[ "figi : global catalog" ] = {

    setUp: function( done ) {
        figi.catalog = oSimpleCatalog;
        done();
    },

    tearDown: function( done ) {
        figi.catalog = {};
        done();
    },

    "figi.catalog": function( test ) {
        test.notEqual( figi.catalog, {}, "should not be an empty object" );
        test.equal( figi.catalog[ ";)" ], "wink.png", "should be 'wink.png'" );
        test.equal( figi.catalog[ ":D" ], "lol.png", "should be 'lol.png'" );
        test.equal( figi.catalog[ ":'(" ], "cry.png", "should be 'cry.png'" );

        test.done();
    },

    "figi( string ) with catalog": function( test ) {
        var sAttendedStringOne = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> ! Sometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"emote\" />... But I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringOne ), sAttendedStringOne, "should be '" + sAttendedStringOne + "'." );
        var sAttendedStringTwo = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> !\nSometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"emote\" />...\nBut I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringTwo ), sAttendedStringTwo, "should be '" + sAttendedStringTwo + "'." );

        test.done();
    },

    "figi( string ) with catalog and multiple same emote": function( test ) {
        var sTestStringMultiple = "Hi, this is a multiple emote : ;) ;) ;)"
        var sAttendedStringMultiple = "Hi, this is a multiple emote : <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> <img src=\"./wink.png\" alt=\";)\" class=\"emote\" />";
        test.equal( figi( sTestStringMultiple ), sAttendedStringMultiple, "should be '" + sAttendedStringMultiple + "'." );

        test.done();
    }
};

exports[ "figi : global classes" ] = {

    setUp: function( done ) {
        figi.catalog = oSimpleCatalog;
        done();
    },

    tearDown: function( done ) {
        figi.classes = "emote";
        done();
    },

    "figi.classes as string": function( test ) {
        figi.classes = "icon smiley";

        test.equal( figi.classes, "icon smiley", "should be 'icon smiley'" );

        var sAttendedStringOne = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"icon smiley\" /> ! Sometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"icon smiley\" />... But I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"icon smiley\" /> !";
        test.equal( figi( sTestStringOne ), sAttendedStringOne, "should be '" + sAttendedStringOne + "'." );
        var sAttendedStringTwo = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"icon smiley\" /> !\nSometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"icon smiley\" />...\nBut I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"icon smiley\" /> !";
        test.equal( figi( sTestStringTwo ), sAttendedStringTwo, "should be '" + sAttendedStringTwo + "'." );

        test.done();
    },

    "figi.classes as array": function( test ) {
        figi.classes = [ "icon", "smiley" ];

        test.deepEqual( figi.classes, [ "icon", "smiley" ], "should be '[ \"icon\", \"smiley\" ]'" );

        var sAttendedStringOne = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"icon smiley\" /> ! Sometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"icon smiley\" />... But I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"icon smiley\" /> !";
        test.equal( figi( sTestStringOne ), sAttendedStringOne, "should be '" + sAttendedStringOne + "'." );
        var sAttendedStringTwo = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"icon smiley\" /> !\nSometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"icon smiley\" />...\nBut I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"icon smiley\" /> !";
        test.equal( figi( sTestStringTwo ), sAttendedStringTwo, "should be '" + sAttendedStringTwo + "'." );

        test.done();
    }
};

exports[ "figi : global base path" ] = {

    setUp: function( done ) {
        figi.catalog = oSimpleCatalog;
        done();
    },

    tearDown: function( done ) {
        figi.path = "./";
        done();
    },

    "figi.path": function( test ) {
        figi.path = "/styles/images/icons/";

        test.equal( figi.path, "/styles/images/icons/", "should be '/styles/images/icons/'" );

        var sAttendedStringOne = "Hi, I love using emoticons <img src=\"/styles/images/icons/wink.png\" alt=\";)\" class=\"emote\" /> ! Sometimes, I :smile:, sometimes I <img src=\"/styles/images/icons/cry.png\" alt=\":'(\" class=\"emote\" />... But I always use figi <img src=\"/styles/images/icons/lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringOne ), sAttendedStringOne, "should be '" + sAttendedStringOne + "'." );
        var sAttendedStringTwo = "Hi, I love using emoticons <img src=\"/styles/images/icons/wink.png\" alt=\";)\" class=\"emote\" /> !\nSometimes, I :smile:, sometimes I <img src=\"/styles/images/icons/cry.png\" alt=\":'(\" class=\"emote\" />...\nBut I always use figi <img src=\"/styles/images/icons/lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringTwo ), sAttendedStringTwo, "should be '" + sAttendedStringTwo + "'." );

        test.done();
    }
};

exports[ "figi : global replacer" ] = {

    setUp: function( done ) {
        figi.catalog = oSimpleCatalog;
        done();
    },

    tearDown: function( done ) {
        figi.replacer = function(value, key) {
            var _base, _ref;
            return "<img src=\"" + ((_ref = this.path) != null ? _ref : _defaultPath) + value + "\" alt=\"" + key + "\" class=\"" + ((typeof (_base = this.classes).join === "function" ? _base.join(" ") : void 0) || this.classes) + "\" />";
        };
        done();
    },

    "figi.replacer": function( test ) {
        figi.replacer = function( value, key ) {
            return '<i title="' + value + '">' + key + '</i>'
        };

        var sAttendedStringOne = "Hi, I love using emoticons <i title=\"wink.png\">;)</i> ! Sometimes, I :smile:, sometimes I <i title=\"cry.png\">:'(</i>... But I always use figi <i title=\"lol.png\">:D</i> !";
        test.equal( figi( sTestStringOne ), sAttendedStringOne, "should be '" + sAttendedStringOne + "'." );
        var sAttendedStringTwo = "Hi, I love using emoticons <i title=\"wink.png\">;)</i> !\nSometimes, I :smile:, sometimes I <i title=\"cry.png\">:'(</i>...\nBut I always use figi <i title=\"lol.png\">:D</i> !";
        test.equal( figi( sTestStringTwo ), sAttendedStringTwo, "should be '" + sAttendedStringTwo + "'." );

        test.done();
    }
};

exports[ "figi : local config" ] = {

    setUp: function( done ) {
        figi.catalog = oSimpleCatalog;
        done();
    },

    "figi with local catalog": function( test ) {
        var oOptions = {
            catalog: {
                ":smile:": "smile.gif"
            }
        };

        var sAttendedStringOne = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> ! Sometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"emote\" />... But I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringOne ), sAttendedStringOne, "should be '" + sAttendedStringOne + "'." );
        var sAttendedStringTwo = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> !\nSometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"emote\" />...\nBut I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringTwo ), sAttendedStringTwo, "should be '" + sAttendedStringTwo + "'." );
        var sAttendedStringThree = "Hi, I love using emoticons ;) ! Sometimes, I <img src=\"./smile.gif\" alt=\":smile:\" class=\"emote\" />, sometimes I :'(... But I always use figi :D !";
        test.equal( figi( sTestStringOne, oOptions ), sAttendedStringThree, "should be '" + sAttendedStringThree + "'." );
        var sAttendedStringFour = "Hi, I love using emoticons ;) !\nSometimes, I <img src=\"./smile.gif\" alt=\":smile:\" class=\"emote\" />, sometimes I :'(...\nBut I always use figi :D !";
        test.equal( figi( sTestStringTwo, oOptions ), sAttendedStringFour, "should be '" + sAttendedStringFour + "'." );

        test.done();
    },

    "figi with local classes": function( test ) {
        var oOptions = {
            classes: "red important"
        };

        var sAttendedStringOne = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> ! Sometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"emote\" />... But I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringOne ), sAttendedStringOne, "should be '" + sAttendedStringOne + "'." );
        var sAttendedStringTwo = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> !\nSometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"emote\" />...\nBut I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringTwo ), sAttendedStringTwo, "should be '" + sAttendedStringTwo + "'." );
        var sAttendedStringThree = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"red important\" /> ! Sometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"red important\" />... But I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"red important\" /> !";
        test.equal( figi( sTestStringOne, oOptions ), sAttendedStringThree, "should be '" + sAttendedStringThree + "'." );
        var sAttendedStringFour = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"red important\" /> !\nSometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"red important\" />...\nBut I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"red important\" /> !";
        test.equal( figi( sTestStringTwo, oOptions ), sAttendedStringFour, "should be '" + sAttendedStringFour + "'." );

        test.done();
    },

    "figi with local path": function( test ) {
        var oOptions = {
            path: "/styles/icons/"
        };

        var sAttendedStringOne = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> ! Sometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"emote\" />... But I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringOne ), sAttendedStringOne, "should be '" + sAttendedStringOne + "'." );
        var sAttendedStringTwo = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> !\nSometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"emote\" />...\nBut I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringTwo ), sAttendedStringTwo, "should be '" + sAttendedStringTwo + "'." );
        var sAttendedStringThree = "Hi, I love using emoticons <img src=\"/styles/icons/wink.png\" alt=\";)\" class=\"emote\" /> ! Sometimes, I :smile:, sometimes I <img src=\"/styles/icons/cry.png\" alt=\":'(\" class=\"emote\" />... But I always use figi <img src=\"/styles/icons/lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringOne, oOptions ), sAttendedStringThree, "should be '" + sAttendedStringThree + "'." );
        var sAttendedStringFour = "Hi, I love using emoticons <img src=\"/styles/icons/wink.png\" alt=\";)\" class=\"emote\" /> !\nSometimes, I :smile:, sometimes I <img src=\"/styles/icons/cry.png\" alt=\":'(\" class=\"emote\" />...\nBut I always use figi <img src=\"/styles/icons/lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringTwo, oOptions ), sAttendedStringFour, "should be '" + sAttendedStringFour + "'." );

        test.done();
    },

    "figi with local replacer": function( test ) {
        var oOptions = {
            replacer: function( value, key ) {
                return '<i title="' + value + '">' + key + '</i>'
            }
        };

        var sAttendedStringOne = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> ! Sometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"emote\" />... But I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringOne ), sAttendedStringOne, "should be '" + sAttendedStringOne + "'." );
        var sAttendedStringTwo = "Hi, I love using emoticons <img src=\"./wink.png\" alt=\";)\" class=\"emote\" /> !\nSometimes, I :smile:, sometimes I <img src=\"./cry.png\" alt=\":'(\" class=\"emote\" />...\nBut I always use figi <img src=\"./lol.png\" alt=\":D\" class=\"emote\" /> !";
        test.equal( figi( sTestStringTwo ), sAttendedStringTwo, "should be '" + sAttendedStringTwo + "'." );
        var sAttendedStringThree = "Hi, I love using emoticons <i title=\"wink.png\">;)</i> ! Sometimes, I :smile:, sometimes I <i title=\"cry.png\">:'(</i>... But I always use figi <i title=\"lol.png\">:D</i> !";
        test.equal( figi( sTestStringOne, oOptions ), sAttendedStringThree, "should be '" + sAttendedStringThree + "'." );
        var sAttendedStringFour = "Hi, I love using emoticons <i title=\"wink.png\">;)</i> !\nSometimes, I :smile:, sometimes I <i title=\"cry.png\">:'(</i>...\nBut I always use figi <i title=\"lol.png\">:D</i> !";
        test.equal( figi( sTestStringTwo, oOptions ), sAttendedStringFour, "should be '" + sAttendedStringFour + "'." );

        test.done();
    }
};
