// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const { OpenAIApi, Configuration } = require('openai');

// const app = express();

// app.use(cors());
// app.use(express.json());

// // const openai = new OpenAIApi('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');

// const openai = new OpenAIApi(
//     new Configuration({
//         apiKey: process.env.OPENAISECRETKEY
//     })
// );

// const PORT = process.env.PORT || 5000;

// app.post('/completions', async (req, res) => {
//     try {
//         const completion = await openai.createCompletion({
//             model: 'gpt-3.5-turbo',
//             messages: [
//                 { role: 'user', content: `create a SQL request to ${req.body.message}` },
//             ],
//         });

//         res.status(200).json(completion.choices[0].message.content);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAIApi, Configuration } = require('openai');
const rateLimit = require("express-rate-limit");

const app = express();

app.use(cors());
app.use(express.json());

// const openai = new OpenAIApi('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');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 5000;

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Maximum 5 requests per minute
});

app.use(limiter);

app.post('/completions', async (req, res) => {
    try {
        console.log(req.body.message)
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: `create a SQL request to ${req.body.message}` }],
        });
        res.status(200).json(completion.data.choices[0].message);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
