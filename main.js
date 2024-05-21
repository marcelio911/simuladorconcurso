// import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import './src/styles/main.css';

import aiplatform from '@google-cloud/aiplatform';

// 🔥 FILL THIS OUT FIRST! 🔥
// 🔥 GET YOUR GEMINI API KEY AT 🔥
// 🔥 https://g.co/ai/idxGetGeminiKey 🔥
let form = document.querySelector('form');
let promptInput = document.querySelector('input[name="prompt"]');
let output = document.querySelector('.output');

form.onsubmit = async (ev) => {
  ev.preventDefault();
  output.textContent = 'Generating...';
  let inlineData = document.getElementById('questionText');

  const publisher = 'google';
  const model = 'text-bison@001';
  const project = 'ecommerceui-128f1';
  const location = 'southamerica-east1';

  // Imports the Google Cloud Prediction service client
  const { PredictionServiceClient } = aiplatform.v1;
  // Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: `${location}-aiplatform.googleapis.com`,
  };
  const predictionServiceClient = new PredictionServiceClient(clientOptions);

  const { helpers } = aiplatform;




  async function callPredict() {
    // Configure the parent resource
    const endpoint = `projects/${project}/locations/${location}/publishers/${publisher}/models/${model}`;

    const prompt = {
      prompt:
        promptInput.value + ' ' + inlineData.innerHTML,
    };
    const instanceValue = helpers.toValue(prompt);
    const instances = [instanceValue];

    const parameter = {
      temperature: 0.2,
      maxOutputTokens: 256,
      topP: 0.95,
      topK: 40,
    };
    const parameters = helpers.toValue(parameter);

    const request = {
      endpoint,
      instances,
      parameters,
    };

    // Predict request
    const response = await predictionServiceClient.predict(request);
    console.log('Get text prompt response');
    console.log(response);
    output.textContent = response.predictions[0].displayText;
  }




  try {
    callPredict();


  } catch (e) {
    output.innerHTML += '<hr>' + e;
  }
};

