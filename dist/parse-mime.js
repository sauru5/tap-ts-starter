"use strict";
/** Parse MIME files using [Nodemailer.Mailparser](https://nodemailer.com/extras/mailparser/)
 *
 */ /** hack for https://github.com/TypeStrong/typedoc/issues/603 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
Updated mailparser to 2.2.0 to avoid malicious getcookies module; see https://blog.npmjs.org/post/173526807575/reported-malicious-module-getcookies
Consider mailparse (https://github.com/javascriptlove/mailparse) for the future, since mailparser will no longer be maintained. Mailparse does not yet have any TypeScript types available.
*/
var mailparser = require("mailparser");
//var mp = mailparser.MailParser; // low-level parser
var sp = mailparser.simpleParser; // higher-level parser (easier to use, not as efficient)
var tapTypes = require("./tap-types");
/** Convert the Mime message into json */
function parseItem(mimeEmail) {
    return sp(mimeEmail).then(function (emailObj) {
        var rec = new tapTypes.streamRecord();
        rec.stream = 'email';
        rec.time_extracted = new Date();
        rec.record = emailObj;
        return rec;
    });
}
exports.parseItem = parseItem;
//# sourceMappingURL=parse-mime.js.map