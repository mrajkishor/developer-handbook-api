const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const { mapper } = require('./mapper.js');

const BUCKET_NAME = 'your-s3-bucket-name'; // <-- replace with your real bucket name

function findMd(mapperNode, urlParts) {
    if (!mapperNode || typeof mapperNode !== 'object') return null;
    if (!urlParts.length) return mapperNode.___md___ || null;

    const [current, ...rest] = urlParts;
    for (let key in mapperNode) {
        if (mapperNode[key]?.___urlPath___ === current) {
            return findMd(mapperNode[key], rest);
        }
    }
    return null;
}

exports.handler = async (event) => {
    const path = event.queryStringParameters?.path;

    if (!path) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Path query parameter is required.' }) };
    }

    const urlParts = path.split('/').filter(Boolean);
    const mdId = findMd(mapper.Contents, urlParts);

    if (!mdId) {
        return { statusCode: 404, body: JSON.stringify({ error: 'No mapping found for the given path.' }) };
    }

    const key = `${mdId}.md`;

    try {
        const data = await s3.getObject({ Bucket: BUCKET_NAME, Key: key }).promise();
        const content = data.Body.toString('utf-8');

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        };
    } catch (err) {
        console.error('S3 Error:', err.message);
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Markdown file not found.' }),
        };
    }
};
