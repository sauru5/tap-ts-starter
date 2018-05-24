"use strict";
/**
 * The exports in this file can be set as "handlers" (entry points) for AWS Lambda functions;
 * e.g. module.exports.hello in handler.js is accessible as "handler.hello".
 *
 * For automated Serverless deployment this is setup is managed in [serverless.yml](../../serverless.yml).
 * Search for handler.hello to see how is is done.
 */ /** hack for https://github.com/TypeStrong/typedoc/issues/603 */
Object.defineProperty(exports, "__esModule", { value: true });
var getFile = require("./s3-getfile");
// response object for Lambda Proxy integration; see https://serverless.com/framework/docs/providers/aws/events/apigateway/
var lambdaResponse = /** @class */ (function () {
    function lambdaResponse() {
        this.statusCode = 200;
        this.headers = {
            // TODO: limit to a whitelist of allowed sites
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
        };
        this.body = ''; // set response body here
    }
    return lambdaResponse;
}());
function hello(event, context, callback) {
    var response = new lambdaResponse();
    response.body = JSON.stringify({
        message: 'Hello! Your function executed successfully!',
        input: event
    });
    callback(null, response);
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Hello! Your function executed successfully!', event });
}
exports.hello = hello;
function handleFileTrigger(event, context, callback) {
    var response = new lambdaResponse();
    function handleFile(contents) {
        // do something with the file here
        console.log('File Contents: \n' + contents);
        // response.body.fileContents = contents;
    }
    if (typeof event === 'string') {
        handleFile(event);
        callback(null, response);
    }
    else {
        getFile
            .getFilePromise(event.Records[0]) // this grabs only the first record, assuming we'll always only receive one at a time
            .then(function (value) {
            handleFile(value);
            return value;
        })
            .catch(function (error) {
            // Handle any error from all above steps
            console.log('final error: ', error);
            return error;
        })
            .then(function (finalResult) {
            // final .then replaces .finally
            callback(null, response);
        });
    }
}
exports.handleFileTrigger = handleFileTrigger;
//# sourceMappingURL=handler.js.map