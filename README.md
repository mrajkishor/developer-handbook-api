# 📚 Markdown Reader API

This project is a simple backend server to **fetch Markdown (`.md`) files** based on a **nested URL path** using a **mapper**.

---

## 🏗️ Project Structure

```
project-root/
├── server.js          # Express server
├── mapper.js          # URL-to-Markdown ID mapping
└── markdowns/         # Folder containing .md files
    ├── 1.md
    ├── 2.md
    ├── 3.md
    └── ...
```

---

## 🚀 How It Works

- The frontend sends a **GET request** with a `path` parameter.
- The server traverses `mapper.js` to find the corresponding `__md__` ID.
- It then reads the respective `.md` file from the `markdowns/` folder.
- Finally, it returns the **markdown content** as JSON.

---

## 🛠️ Installation

1. Clone this repository:
   ```bash
   git clone <repo-url>
   cd developer-handbook-api
   ```

2. Install dependencies:
   ```bash
   npm install express
   ```

3. Place your Markdown files (`1.md`, `2.md`, etc.) inside the `markdowns/` folder.

4. Prepare your `mapper.js` according to your URL structure.

---

## 📡 API Usage

### Endpoint
```
GET /api/markdown
```

### Query Parameters
| Param | Type | Description |
|:---|:---|:---|
| `path` | `string` | URL-like path representing the Markdown content to fetch |

### Example Request
```
GET http://localhost:3000/api/markdown?path=contents/full-stack-developer-course/data-structures/Array/problems/longest-repeating-character-replacement
```

### Example Response
```json
{
  "content": "# Longest Repeating Character Replacement\n\nThis is the Markdown content..."
}
```

---

## 🔥 Example Frontend Integration

React:

```javascript
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function MarkdownViewer({ path }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/api/markdown?path=${encodeURIComponent(path)}`)
      .then(res => res.json())
      .then(data => setContent(data.content));
  }, [path]);

  return <ReactMarkdown>{content}</ReactMarkdown>;
}
```
---

## 🧠 Notes

- If a Markdown file is not found, the API returns a 404 error. It is the responsibility of the frontend to catch the error and redirect to a fallback page using an ErrorBoundary or error handling logic
- `mapper.js` should match the exact nesting of URL paths.
---

# ✨ Future Improvements

- Caching frequently accessed `.md` files in memory.
- Adding an admin dashboard to manage `.md` content dynamically.
- Rate limiting and API authentication for better security.

## 📜 License

This project is open-sourced under the [MIT License](LICENSE).
