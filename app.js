const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const { quicktype, InputData, JSONSchemaInput, JSONSchemaStore, FetchingJSONSchemaStore, jsonInputForTargetLanguage } = require('quicktype-core');

const app = express();
const port = 3000; // You can change this port as needed

// Middleware to parse JSON requests
app.use(bodyParser.json());


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile)

// Define a route to handle API requests
app.get('/*', (req, res) => {
  const requestPath = req.params[0]; // Capture the entire URL path
  
  const sanitizedUrl = requestPath.replace(/\//g, ':'); // Replace underscores with slashes
  const filePath = path.join(__dirname, 'input', `${sanitizedUrl}.json`);

  const type = req.query.type;
  const typeName = req.query.name;
  const wrapper = req.query.wrapper;
  
  console.log(`requestPath: ${requestPath}, ${type}, ${wrapper}`)
  
  console.log(`filePath: ${filePath}`)
  
  fs.readFile(filePath, 'utf8', (error, fileData) => {
    if (error) {
      console.log(error)
      res.status(404).json({ error: 'API not found' });
      return;
    }

    try {
      const jsonResponse = JSON.parse(fileData);
      var response = jsonResponse
      if (wrapper != undefined) {
        response = {
          [wrapper]: jsonResponse,
        };
      }

      if (type == 'html') {
        res.render('index', {
          typeName: typeName,
          json: JSON.stringify(response)
        });
        return;
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


