
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();
const configuration = new Configuration({
    organization: "org-dtV4tB2hmkBdIqsvLrjqqZBe",
    apiKey:process.env.Api_key,
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

