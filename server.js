const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const { mapper } = require('./mapper.js');

// Helper function to recursively find ___md___ by url parts
function findMd(mapperNode, urlParts) {
    if (!mapperNode || typeof mapperNode !== 'object') {
        return null; // prevent undefined errors
    }
    if (!urlParts.length) {
        return mapperNode.___md___ || null;
    }
    const [current, ...rest] = urlParts;
    for (let key in mapperNode) {
        if (mapperNode[key]?.___urlPath___ === current) {
            return findMd(mapperNode[key], rest);
        }
    }
    return null;
}



// GET /api/markdown?path=contents/your-path/...
app.get('/api/markdown', (req, res) => {
    const urlPath = req.query.path;
    if (!urlPath) {
        return res.status(400).json({ error: 'Path query parameter is required.' });
    }

    const urlParts = urlPath.split('/').filter(Boolean);
    try {
        const mdId = findMd(mapper.Contents, urlParts);

        if (mdId === null) {
            return res.status(404).json({ error: 'This path does not point to a markdown file. It may be a folder or incomplete path.' });
        }

        const filePath = path.join(__dirname, 'markdowns', `${mdId}.md`);

        fs.access(filePath, fs.constants.F_OK, (accessErr) => {
            if (accessErr) {
                return res.status(404).json({ error: 'Markdown file does not exist.' });
            }

            fs.readFile(filePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    return res.status(500).json({ error: 'Failed to read markdown file.' });
                }
                res.json({ content: data });
            });
        });
    } catch (error) {
        console.error('Error processing markdown request:', error.message);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});




const PORT = process.env.PORT || 3123;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
