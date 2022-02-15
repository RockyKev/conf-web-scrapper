// NOTE: This is now being done by the API software online https://pipedream.com/workflows

const axios = require('axios')
const cheerio = require('cheerio')
// const pretty = require('pretty')
const fs = require('fs')
const date = require('date-and-time');

const {JsonCircularCB, generateFile } = require('./utilities');

// TODO: Rename this file to something else once you get things working.
// const url = 'https://www.twobarrels.com/jobs/'


/**
 * Processing: 
* 
 * 1. get the list url
 * 2. Get the list name, to pass to the thing
 * 3. Get each video name
 * 4. Video link; text title, video link
 * 
 * https://www.youtube.com/playlist?list=PL0TQYXcAtbwSh9ZbY-34J9XK2fVR23aCl
 * 
 * */ 


const url = 'https://www.youtube.com/playlist?list=PL0TQYXcAtbwSh9ZbY-34J9XK2fVR23aCl'
// const url = 'https://example.com/';

// Poor man's debug. This is to test and clean data without fetching.
const GO_ONLINE = false;

if (GO_ONLINE) {
  axios.get(url).then(
    (response) => {
      if (response.status === 200) {
        const html = response.data
        const $ = cheerio.load(html)

          // TODO: Fix this in the 2B-web-scrapper
          // generateFile('./cheerio_data/2B-live.json', cleanTheData($))
          console.log($.html())
          console.log(typeof $.html)

        // To generate the file without clean data
        generateFile('./cheerio_data/test.html', $.html(), false);
      }
    },
    (error) => console.log(error)
  )
} else {
  // How to test it manually 
  console.log('fetching file')

  // Open the file locally
  const src = './cheerio_data/test.html'
  const fileOpened = require('fs').readFileSync(src, 'utf8')

  // get the text file
  const $ = cheerio.load(fileOpened)

  generateFile('./cheerio_data/video-data.json', cleanTheData($))
}

// This function will always be custom written for the website
function cleanTheData($) {
  console.log("im in cleanTheData and we're ONLINE:", GO_ONLINE)

  let returnData = []

  // get ytd-playlist-video-renderer
  // inside of that, get 

  // $('.positions-upper')
  //   .children()
  //   .each(function (index) {
  //     if ($(this).prop('tagName').toLowerCase() === 'article') {
  //       const h3 = $(this).find('h3')
  //       const $title = h3.contents().not(h3.children()).text()
  //       const $salary = h3.contents().text()

  //       const cleanTitle = $title
  //         .replace(/(\r\n|\n|\r)/gm, '')
  //         .replace(/\s+/g, ' ')
  //         .trim()
  //       const cleanSalary = $salary
  //         .replace(/(\r\n|\n|\r)/gm, '')
  //         .replace(/\s+/g, ' ')
  //         .trim()
  //         .split(' ')
  //         .filter(function (item) {
  //           return item.match(/^\$/)
  //         })

  //       // cleaned up version
  //       const obj = {
  //         title: cleanTitle,
  //         salary: cleanSalary,
  //       }

  //       returnData[index] = obj
  //     }
  //   })

  // delete empty nodes
  const timestamp = date.format(new Date(), 'YYYY-MM-DD-HH-mm-ss');

  // returnData = returnData.filter((a) => a);

  const finalReturn = {
    "timestamp:" : Date.now(),
    "readable-timestamp": timestamp,
    "salaries": returnData
  }
  return JSON.stringify(finalReturn, JsonCircularCB())
}
