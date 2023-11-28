"use strict"

let lib2 = (function(lib) { // import lib
    let x = 2;

    return {x}; // export x
})(lib);
