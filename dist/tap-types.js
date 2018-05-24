"use strict";
/** Types from Singer spec
 * https://github.com/singer-io/getting-started/blob/master/SPEC.md
*/ /** hack for https://github.com/TypeStrong/typedoc/issues/603 */
Object.defineProperty(exports, "__esModule", { value: true });
/** SCHEMA messages describe the datatypes of data in the stream
 * https://github.com/singer-io/getting-started/blob/master/SPEC.md#schema */
var streamSchema = /** @class */ (function () {
    function streamSchema() {
        this.type = 'SCHEMA';
    }
    return streamSchema;
}());
exports.streamSchema = streamSchema;
/** RECORD messages contain the data from the data stream.
 * https://github.com/singer-io/getting-started/blob/master/SPEC.md#record */
var streamRecord = /** @class */ (function () {
    function streamRecord() {
        this.type = 'RECORD';
    }
    return streamRecord;
}());
exports.streamRecord = streamRecord;
/** STATE messages contain the state that the Tap wishes to persist.
 * https://github.com/singer-io/getting-started/blob/master/SPEC.md#state-1 */
var streamState = /** @class */ (function () {
    function streamState() {
        this.type = 'STATE';
    }
    return streamState;
}());
exports.streamState = streamState;
//# sourceMappingURL=tap-types.js.map