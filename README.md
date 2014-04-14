# figi 

> Parse emoticons in text and replace by html images... or whatever you need.

[![Build Status](https://secure.travis-ci.org/leny/figi.png?branch=master)](http://travis-ci.org/leny/figi) [![NPM version](https://badge.fury.io/js/figi.png)](http://badge.fury.io/js/figi) [![Dependency Status](https://david-dm.org/leny/figi.png)](https://david-dm.org/leny/figi)

* * *

## Getting Started

### From **browsers** and **node**.

**figi** use the [umd](https://github.com/umdjs/umd) implementation to be usable from anywhere (client, server, ...).

Install the module with: `npm install figi`

### Simple usage

See **documentation** for more informations.

```javascript
var figi = require( "figi" );

figi.catalog = {
    ":)": "smile.png",
    ";)": "wink.png",
    ":D": "lol.png"
};

var str = figi( "I'm happy ;) !" ); // "I'm happy <img src="./wink.png" alt=";)" class="emote" /> !"
```

## Documentation

**figi** find predefined sequences in strings and returns the strings with `<img />` tags for finded sequences.

The first purpose of **figi** is, of course, to find and replace emoticons by images.

### Setup **figi**

#### catalog

At least, **figi** needs a catalog of strings to find and replace in your strings.

By default, the catalog of **figi** is *empty* : it search and replace nothing.

To define it globaly, you can pass your catalog to `figi.catalog`, as in the following example : 

```javascript
figi.catalog = {
    ":)": "smile.png",
    ";)": "wink.png",
    ":D": "lol.png"
};
```

**figi** will only use the `string` keys, the other key types will be ignored. The value of a key *should* be a string, but you can do whatever you want if you redefine the parser (see below).

#### classes

By default, **figi** add the unique `emote` class on the resulting `<img />` tags. You can provide a `string` or an `array` of strings to `figi.classes`.

```javascript
figi.classes = "smiley little red";
```

```javascript
figi.classes = [ "smiley", "little", "red" ];
```

#### base path

By default, **figi** use the `./` base path for emoticon images. You can replace it by passing a `string` to `figi.path`.

```javascript
figi.path = "http://mysite.com/images/emotes/";
```

#### replacer

By default, **figi** replace each key of the catalog by an `<img />` tag with an `src` attribute (the *value* of the key, prefixed by the path), an `alt` attribute (the key), and a `class` attribute (by default, the class *emote*).

You can change the replacement by anything you want by passing a function to `figi.replacer`.

This function will receive two arguments : the value and the key, and must return the replaced value of the key, to be substitute in the original string. Inside the `replacer` function, the `this` context will be the `figi` instance, to access the predefined values, as in the following example.

```javascript
figi.replacer = function( value, key ) {
    return '<i data-icon="' + this.path + value + '" title="' + key + '">' + key + '</i>';
};
```

### use **figi**

#### Using globally-setted config values.

Using **figi** is very simple : 

```javascript
var inputString = "Hi, I love to use emoticon like this :) in my texts. And to replace these by images, I use figi ! ;)";

var parsedString = figi( inputString );
```

The `parsedString` var will be :

`Hi, I love to use emoticon like this <img src="./smile.png" alt=":)" class="emote" /> in my texts. And to replace these by images, I use figi ! <img src="./wink.png" alt=";)" class="emote" />`

#### Using local config values.

You can also use **figi** with local config values when you call it, like this : 

```javascript
var inputString = "Hi, I love to use emoticon like this :) in my texts. And to replace these by images, I use figi ! ;)";

var parsedString = figi( inputString, {
    catalog: {
        ":)": "round-smile.png",
        ";)": "round-wink.png"
    },
    classes: "little smiley",
    path: "./img/emotes/"
} );
```

The `parsedString` var will be :

`Hi, I love to use emoticon like this <img src="./img/emotes/round-smile.png" alt=":)" class="little smiley" /> in my texts. And to replace these by images, I use figi ! <img src="./img/emotes/round-wink.png" alt=";)" class="little smiley" />`

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* **0.1.0**: Initial release (*15/04/14*)

## License
(Un)licensed under the UNLICENSE, by Leny.
