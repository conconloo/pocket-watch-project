const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let apiKey = 'AIzaSyCKCEMgiaLWZNfcMVsDwnVGf8qbkKN2s_g';

// const {Translate} = require('@google-cloud/translate').v2;
// const translate = new Translate();

/*
Plan of Action:
* Write a function that can translate text in a specific element
* Figure out how to translate all the elements in an HTML page
*/

async function translateElement(req, elementid, to_language) {
    const getText = document.getElementById(elementid); // gets the specific document component
    const translateElement = axios.create({
        baseURL: 'https://translation.googleapis.com/language/translate/v2',
        params: {
            q: getText.innerText, // only get the text contained in the element
            source: "en",
            target: to_language,
            key: apiKey
        }
    });
    const response = await translateElement.get("");
    console.log(response);
    return response.data;
}

router.get('/', async (req, res,elementid, to_language) => {
    const data = await translateElement(req, elementid, to_language);
    res.json([
        data
    ]);
})