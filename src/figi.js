/* figi
 * https://github.com/leny/figi
 *
 * Copyright (c) 2014 leny
 * Licensed under the MIT license.
 */

let fToRegExp,
    fFigi,
    _oDefaultCatalog = {},
    _sDefaultClasses = "emote",
    _sDefaultPath = "./",
    _fDefaultReplacer = function( sValue, sKey ) {
        return `<img src="${ this.path || _sDefaultPath }${ sValue }" alt="${ sKey }" class="${ ( this.classes.join && this.classes.join( " " ) ) || this.classes }\" />`;
    },
    _oDefaultOptions = {
        "catalog": _oDefaultCatalog,
        "classes": _sDefaultClasses,
        "path": _sDefaultPath,
        "replacer": _fDefaultReplacer
    };

fToRegExp = function( sKey ) {
    // inspired from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
    return new RegExp( sKey.replace( /([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1" ), "g" );
};

fFigi = function( sString, oOptions = {} ) {
    let sTransformedString = sString,
        oMergedOptions = Object.assign( {}, _oDefaultOptions, {
            "catalog": fFigi.catalog,
            "classes": fFigi.classes,
            "path": fFigi.path,
            "replacer": fFigi.replacer
        }, oOptions );

    for ( let sKey in oMergedOptions.catalog ) {
        if ( typeof sKey === "string" ) {
            let sValue = oMergedOptions.catalog[ sKey ];

            sTransformedString = sTransformedString.replace( fToRegExp( sKey ), function() { // eslint-disable-line no-loop-func, prefer-arrow-callback
                return oMergedOptions.replacer( sValue, sKey );
            } );
        }
    }

    return sTransformedString;
};

fFigi.catalog = _oDefaultCatalog;
fFigi.classes = _sDefaultClasses;
fFigi.path = _sDefaultPath;
fFigi.replacer = _fDefaultReplacer;

export default fFigi;
