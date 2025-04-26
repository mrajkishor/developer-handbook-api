

# 📚 Markdown Reader API – AWS Serverless (Lambda + S3 + API Gateway)

This project builds a **serverless API** to serve **Markdown (`.md`) files** stored in **AWS S3**,  
using **AWS Lambda**, **API Gateway**, and **AWS SAM CLI** for deployment.

It supports a clean URL-path structure using a **`mapper.js`** file and returns markdown content as JSON via HTTP GET.

---

# 🏗️ Architecture Overview

```
Client (Browser/App)
    ↓
API Gateway (Secure Public API)
    ↓
AWS Lambda (Node.js: Find mapper + Fetch markdown)
    ↓
AWS S3 (Private Markdown Files)
```

✅ Fully serverless,  
✅ Highly scalable,  
✅ Very low cost (~₹0–5 per month for small use cases).

---

# 📂 Project Structure

```
markdown-reader-api-aws/
├── handler.js         # AWS Lambda function code
├── mapper.js          # Static URL-to-markdown-id mapping
├── template.yaml      # AWS SAM template to deploy the app
├── package.json       # NPM scripts for build and deploy
├── README.md          # Project documentation
└── markdowns/         # (Locally store markdown files, upload to S3 manually)
    ├── 1.md
    ├── 2.md
    └── ...
```

---

# 🚀 Features

- 📄 Serve markdown notes via simple API endpoint.
- 🔒 Private S3 bucket — no public file access.
- 🚀 Fast lookup using `mapper.js` loaded inside Lambda memory.
- 📈 API Gateway caching and rate limiting supported.
- ⚡ Minimal cold starts and efficient memory usage.
- 🧩 Easily extendable for versioning, authentication, etc.

---

# 🧰 Technologies Used

| Tool | Purpose |
|:---|:---|
| **AWS S3** | Store Markdown (`.md`) files |
| **AWS Lambda** | Handle API logic (Node.js) |
| **AWS API Gateway** | Public API layer with rate limiting and caching |
| **AWS SAM CLI** | Infrastructure as Code for deployment |
| **Node.js** | Lambda runtime environment |

---

# 📡 API Usage

## Endpoint

```http
GET /api/markdown?path={path}
```

Example:

```http
GET https://your-api-id.execute-api.region.amazonaws.com/api/markdown?path=contents/full-stack-developer-course/html/headings
```

## Query Parameters

| Parameter | Type | Required | Description |
|:---|:---|:---|:---|
| `path` | String | ✅ | Nested path based on URL structure defined in `mapper.js` |

## Example Successful Response (HTTP 200)

```json
{
  "content": "# Heading\n\nThis is the markdown content here..."
}
```

## Possible Error Responses

| Status | Error |
|:---|:---|
| 400 | `{ "error": "Path query parameter is required." }` |
| 404 | `{ "error": "No mapping found for the given path." }` |
| 404 | `{ "error": "Markdown file not found." }` |
| 500 | `{ "error": "Internal Server Error." }` |

---

# 🔥 Quick Start – Local Setup and Deployment

## 1. Prerequisites

- [AWS Account](https://aws.amazon.com/)
- [AWS CLI installed](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and configured (`aws configure`)
- [AWS SAM CLI installed](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- Node.js installed (for local running)

## 2. Project Setup

```bash
git clone https://github.com/mrajkishor/markdown-reader-api-aws.git
cd markdown-reader-api-aws
```

Upload your `.md` files manually to your S3 bucket under `markdowns/`.

## 3. First Deployment (Guided)

```bash
npm run build
npm run deploy:guided
```
- This will create your first `samconfig.toml`.
- Choose your AWS region, stack name, and S3 bucket for Lambda artifacts.

✅ Your Lambda + API Gateway will be created automatically.

## 4. Future Deployments (Non-Guided)

After first deploy, use:

```bash
npm run build
npm run deploy
```
✅ It will automatically build and deploy using the saved configuration.

---

# ⚙️ Environment Configuration

Inside your `handler.js`, configure:

```javascript
const BUCKET_NAME = 's3-bucket-name';
```
(change it to your actual S3 bucket name.)

✅ You can later move this to Lambda environment variables if needed.

---

# 📋 Updating `mapper.js` and Markdown Files

| Task | How to update |
|:---|:---|
| Add a new topic | Update `mapper.js`, assign new `___md___` ID |
| Add new markdown file | Upload corresponding `ID.md` to S3 manually |
| After changes | Run `npm run build` + `npm run deploy` |

✅ Your API will automatically serve the new content.

---

# 📈 Future Enhancements (Optional)

- 🔐 Add API Key authentication for restricted access.
- ⚡ Add CloudFront CDN before API Gateway for global speed boost.
- 🛡️ Add AWS WAF (Web Application Firewall) for security.
- 💬 Add multilingual Markdown support.

---

# 💵 Cost Estimation

| Service | Expected Monthly Cost (Current Plan) |
|:---|:---|
| S3 Storage (1 GB) | ~$0.023 (₹2) |
| Lambda Invocations (30,000) | Free under AWS Free Tier |
| API Gateway Requests (30,000) | Free under AWS Free Tier |
| Total | **~₹2–5 per month** |

✅ You stay within AWS Free Tier for your current usage!

---

# 🙏 Acknowledgements

- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS S3](https://aws.amazon.com/s3/)
- [AWS API Gateway](https://aws.amazon.com/api-gateway/)
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)

---

© Copyright 2025 | All Rights Reserved
Raj Kishor Productions
