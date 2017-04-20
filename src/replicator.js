const stanza = `

const aws = require('aws-sdk');
const lambda = new aws.Lambda({ region: 'eu-central-1' });

function hook(event, quine, callback) {
  const Role = process.env.Role;
  if (event.queryStringParameters) {
    const FunctionName = event.queryStringParameters.FunctionName;
    lambda.invoke({
      FunctionName: 'zipper',
      Payload: JSON.stringify({ 'index.js': quine }),
    }, (error, data) => {
      if (error) {
        callback();
      } else if (data.StatusCode !== 200) {
        callback();
      } else {
        const ZipFile = new Buffer(JSON.parse(data.Payload));
        const params = {
          Code: { ZipFile },
          FunctionName,
          Handler: 'index.handler',
          Role,
          Runtime: 'nodejs6.10',
          Description: 'Generated by a quine',
          Environment: { Variables: { Role } },
        };

        lambda.createFunction(params, callback);
      }
    });
  } else {
    callback();
  }
}

exports.handler = (event, context, callback) => {
  const backtick = String.fromCharCode(96);
  const quine = 'const stanza = ' + backtick + stanza + backtick + ';' + stanza;
  hook(event, quine, () => {
    const response = {
      statusCode: 200,
      body: quine,
    };
    callback(null, response);
  });
};
`;

const aws = require('aws-sdk');
const lambda = new aws.Lambda({ region: 'eu-central-1' });

function hook(event, quine, callback) {
  const Role = process.env.Role;
  if (event.queryStringParameters) {
    const FunctionName = event.queryStringParameters.FunctionName;
    lambda.invoke({
      FunctionName: 'zipper',
      Payload: JSON.stringify({ 'index.js': quine }),
    }, (error, data) => {
      if (error) {
        callback();
      } else if (data.StatusCode !== 200) {
        callback();
      } else {
        const ZipFile = new Buffer(JSON.parse(data.Payload));
        const params = {
          Code: { ZipFile },
          FunctionName,
          Handler: 'index.handler',
          Role,
          Runtime: 'nodejs6.10',
          Description: 'Generated by a quine',
          Environment: { Variables: { Role } },
        };

        lambda.createFunction(params, callback);
      }
    });
  } else {
    callback();
  }
}

exports.handler = (event, context, callback) => {
  const backtick = String.fromCharCode(96);
  const quine = 'const stanza = ' + backtick + stanza + backtick + ';' + stanza;
  hook(event, quine, () => {
    const response = {
      statusCode: 200,
      body: quine,
    };
    callback(null, response);
  });
};