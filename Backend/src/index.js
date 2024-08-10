const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error('Missing GOOGLE_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function chat(message, prompt) {
  try {
    const fullMessage = `${prompt}\n${message}`;
    const result = await model.generateContent(fullMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return 'An error occurred. Please try again later.';
  }
}

const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the ai-server! 🙏');
});

app.post('/chat', upload.single('file'), async (req, res) => {
  const prompt = 'You are an expert physician with over 1000 years of experience across all medical fields. I am uploading a medical report in PDF format. Please read and analyze it carefully. Identify and summarize all important points, providing a clear and accurate overview.as if you are explaining to an adult person who has not graduated high school. Your analysis should include any potential issues, noting whether the findings are normal, concerning, or require further investigation. Ensure no critical details are missed, and deliver your response in a thorough, professional manner.';
  const { message } = req.body;
  const file = req.file;

  if (!message) {
    return res.status(400).send('Missing message in request body');
  }

  if (!file) {
    return res.status(400).send('Missing file in request');
  }

  try {
    // Read the file content and parse the PDF
    const fileContent = fs.readFileSync(file.path);
    const parsedPDF = await pdfParse(fileContent);
    const pdfText = parsedPDF.text;
    
    // Combine the message with PDF text content and prompt
    const combinedMessage = `${prompt}\n${message}\nFile Content:\n${pdfText}`;

    const response = await chat(combinedMessage, prompt);
    res.json({ response });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  } finally {
    // Cleanup: Remove the uploaded file after processing
    fs.unlinkSync(file.path);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
