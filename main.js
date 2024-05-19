// import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import './style.css';

import aiplatform from '@google-cloud/aiplatform';

// 🔥 FILL THIS OUT FIRST! 🔥
// 🔥 GET YOUR GEMINI API KEY AT 🔥
// 🔥 https://g.co/ai/idxGetGeminiKey 🔥
// let API_KEY = 'AIzaSyANKRfSMKHXSNIDU1ANarW7iS5V1s6kwMU';
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

    // let contents = [
    //   {
    //     role: 'user',
    //     parts: [
    //       // { inline_data: { mime_type: 'image/jpeg', data: imageBase64, } },
    //       { text: promptInput.value + ' ' + inlineData.innerHTML }
    //     ]
    //   }
    // ];

    // // Call the gemini-pro-vision model, and get a stream of results
    // const genAI = new GoogleGenerativeAI(API_KEY);
    // const model = genAI.getGenerativeModel({
    //   model: "text-bison", // "gemini-1.5-flash-latest", //"gemini-pro-vision",
    //   safetySettings: [
    //     {
    //       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    //       threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    //     },
    //   ],
    // });


    // const result = await model.generateContent({ contents });

    // Read from the stream and interpret the output as markdown
    // let buffer = [];
    // // let md = new MarkdownIt();
    // for await (let response of result.stream) {
    //   buffer.push(response.text());
    //   // output.innerHTML = md.render(buffer.join(''));
    //   output.textContent = buffer.join('');
    // }
  } catch (e) {
    output.innerHTML += '<hr>' + e;
  }
};

