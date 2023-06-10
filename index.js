
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const configuration = new Configuration({
    organization: "org-dtV4tB2hmkBdIqsvLrjqqZBe",
    apiKey:"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",
});
const openai = new OpenAIApi(configuration);
const app = express();
app.use(bodyParser.json())
app.use(express.json());
app.use(cors())
const port = 5000;
app.post('/',async (req,res)=>{
  const {message}  = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 100,
        top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["{}"],
      });
      res.json({
      message:response.data.choices[0].text
      })
});
app.listen(port, ()=>{
    console.log('app listening on port 5000')
});

/*const express = require('express')
const axios = require('axios');
const cors = require('cors')
const app = express();
const port = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors())
// API endpoint for handling incoming chat messages
app.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    // Make a request to the ChatGPT API
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      "prompt":message,
      "max_tokens": 100,
      "top_p": 1
    }, {
      headers: {
        'Authorization':"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",
        'Content-Type': 'application/json'
      }
    });

    // Extract the generated chat message from the API response
    const data = response.data.choices[0].text.trim();

    // Send the generated reply back to the client
    res.json({ data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
    console.log({error})
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});*/

