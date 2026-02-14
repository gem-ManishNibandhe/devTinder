const { SESClient } = require("@aws-sdk/client-ses");

// Set the AWS Region (allow override from environment)
const REGION = process.env.AWS_REGION || "ap-south-1";

// Prefer using the default AWS credential provider chain when possible.
// Only pass explicit credentials if both AWS_ACCESS_KEY and AWS_SECRET_KEY are set and non-empty.
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const sessionToken = process.env.AWS_SESSION_TOKEN; // for temporary creds

let sesClient;
if (accessKey && secretKey) {
    if (typeof accessKey !== 'string' || typeof secretKey !== 'string' || accessKey.trim() === '' || secretKey.trim() === '') {
        console.warn('AWS credentials are present but invalid (empty). Falling back to default provider chain.');
        sesClient = new SESClient({ region: REGION,credentials: creds  });
    } else {
        const creds = { accessKeyId: accessKey, secretAccessKey: secretKey };
        if (sessionToken) creds.sessionToken = sessionToken;
        sesClient = new SESClient({ region: REGION, credentials: creds });
    }
} else {
    // No explicit env creds — rely on default provider (EC2/ECS role, shared credentials file, environment, etc.)
    console.warn('AWS_ACCESS_KEY / AWS_SECRET_KEY not set — SES client will use the default credential provider chain.');
    sesClient = new SESClient({ region: REGION });
}

module.exports = { sesClient };