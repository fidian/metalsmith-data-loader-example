#!/usr/bin/env node
"use strict";

var Metalsmith, smith;

Metalsmith = require("metalsmith");
smith = new Metalsmith(__dirname);
smith.source("src/");
smith.destination("dest/");
smith.clean(true);

// Run the data loader middleware. This also removes the source file.
smith.use(require("metalsmith-data-loader")({
    removeSource: true
}));

// Convert destination files to be a dump of their metadata properties.
smith.use(require("metalsmith-each")((file) => {
    var json;

    delete file.contents;
    json = JSON.stringify(file, false, 4);
    file.contents = Buffer.from(`${json}\n`, "utf8");
}));

smith.build((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Build finished");
    }
});
