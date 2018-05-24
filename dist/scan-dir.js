"use strict";
/**
 * A "scanner" scans a resource collection, parsing the items it finds using the parser passed in  (see the [spec](https://github.com/singer-io/getting-started/blob/master/SPEC.md))
 *
 * In this case, we are scanning a directory and parsing the files inside.
 */ /** hack for https://github.com/TypeStrong/typedoc/issues/603 */
Object.defineProperty(exports, "__esModule", { value: true });
/** fs-extra is a promise-enabled superset of the standard fs package */
var fse = require("fs-extra");
var tapTypes = require("./tap-types");
/** generate json-schemas for our records, if needed */
var generateSchema = require('generate-schema'); // typescript types aren't available so we load javascript-style instead of using typescript's import
/**
 * Scan a folder, running parser on each file it finds
 * - TODO: implement configObjs.state and configObjs.catalog, which are just stubs for now
 * - TODO: use interfaces instead of "any" here
 * @param configObjs
 * @param parser
 */
function scanDir(configObjs, parser) {
    var config = configObjs.config;
    var state = configObjs.state;
    var catalog = configObjs.catalog;
    // TODO: allow schema(s) to be passed in in config
    var schema = null;
    return fse
        .readdir(config.target_folder)
        .then(function (filelist) {
        return Promise.all(
        // return an array of promises, one per filename, for Promise.all to run asynchronously
        filelist.map(function (filename, idx) {
            return fse
                .readFile(config.target_folder + '/' + filelist[idx])
                .then(function (buffer) {
                // the parsing is done here
                return parser(buffer);
            });
        }));
    })
        .then(function (parsedObjs) {
        if (parsedObjs.length == 0)
            return null;
        var schm = new tapTypes.streamSchema();
        // if no schema exists, create a schema based on the first new object
        if (!schm.schema)
            schm.schema = generateSchema.json(parsedObjs[0].record);
        schm.stream = parsedObjs[0].stream;
        // write the schema
        console.log(JSON.stringify(schm));
        // write the objects
        parsedObjs.forEach(function (parsedObj, idx) {
            console.log(JSON.stringify(parsedObj));
        });
        // TODO: write STATE record
        return parsedObjs;
    });
}
exports.scanDir = scanDir;
//# sourceMappingURL=scan-dir.js.map