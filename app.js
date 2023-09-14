const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // You can change this port as needed

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define a route to handle API requests
app.get('/*', (req, res) => {
  const requestPath = req.params[0]; // Capture the entire URL path
  console.log(requestPath)

  const sanitizedUrl = requestPath.replace(/\//g, ':'); // Replace underscores with slashes
  const filePath = path.join(__dirname, 'input', `${sanitizedUrl}.json`);

  const type = req.query.type;

  console.log(filePath)
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.log(error)
      res.status(404).json({ error: 'API not found' });
      return;
    }

    try {
      const jsonResponse = JSON.parse(data);
      const response = {
        data: jsonResponse,
      };
      if (type == 'file' ) {
        const tempFilePath = '/tmp/generated_swift.swift';
        fs.writeFileSync(tempFilePath, swiftCode);

        // Set the appropriate headers for download
        res.setHeader('Content-Disposition', 'attachment; filename=generated_swift.swift');
        res.setHeader('Content-Type', 'application/octet-stream');

        // Stream the file as the response
        const fileStream = fs.createReadStream(tempFilePath);
        fileStream.pipe(res);

        // Clean up the temporary file
        fs.unlinkSync(tempFilePath);
      } else {
        res.json(response);
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid JSON response' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


