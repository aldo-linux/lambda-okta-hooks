const AWS = require('aws-sdk');

let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

if (process.env.JEST_WORKER_ID) {
    options = {
        endpoint: 'http://localhost:8000',
        region: 'local-env',
        sslEnabled: false,
    };
}

export const documentClient = new AWS.DynamoDB.DocumentClient(options);
