const ytpl = require("ytpl"); // https://www.npmjs.com/package/ytpl
const { generateFile } = require("./utilities");
const { toTitleCase, destructureIntoPlaylistObject, getPresentationAuthor } = require("./helpers");


// import files
// const { jsCongressList } = require("../video_data/data_objects/jsKongressList")
const { jamStackList } = require("../video_data/data_objects/jamStackList") // not yet imported
const { internationalJSList } = require("../video_data/data_objects/internationalJSList") // not yet imported
const { gitNationList2022_02_23 } = require("../video_data/data_objects/gitNationList") // not yet imported
const { jsFestList } = require("../video_data/data_objects/jsFestList") // not yet imported
const { jsHeroesList } = require("../video_data/data_objects/jsHeroesList") // not yet imported
const { grUSPjsdayList } = require("../video_data/data_objects/grUSPjsdayList") // not yet imported
const { jsCampList } = require("../video_data/data_objects/jsCampList") // not yet imported

const CURRENT_PLAYLIST = '';
const DEBUG_RUN_ONE = false;


// TODO:
// 1 - migrate the async and clean data call out
// 2 - each conf should be it's own folder. But the output should always be the same place.
// 3 - the wordpress theme takes a json file from the file uploader plugin.

async function getThatPlayList(meta) {
  try {
    console.log("Calling ytpl - pulling songs");
    const { playlistId, conferenceOwner, conference, year, namingType } = meta;

    const songs = await ytpl(playlistId, { pages: 5 });

    const newFilename = `${conference
      .toLowerCase()
      .replaceAll(/[,.]/g, "")
      .replaceAll(" ", "-")}-${year}`;

    const dataFull = cleanTheData(
      songs,
      conferenceOwner,
      conference,
      year,
      namingType
    );

    const dataClean = dataFull["cleaned"];

    // generate two files
    generateFile(
      `./video_data/full/${newFilename}.json`,
      JSON.stringify(dataFull),
      false
    );
    generateFile(
      `./video_data/clean/${newFilename}-generated.json`,
      JSON.stringify(dataClean),
      false
    );

    console.log("finished");
  } catch (error) {
    console.log(error);
  }
}

function cleanTheData(data, titleOwner, title, year, namingType) {
  const items = data.items;

  let returnData = {
    conferenceOwner: titleOwner,
    conference: title,
    year: year,
    titleOriginal: data.title,
    description: data.description,
  };

  items.forEach((item) => {
    let presentation = getPresentationAuthor(item.title, namingType);

    returnData[item.id] = {
      title: presentation.title,
      author: presentation.author,
      shortUrl: item.shortUrl,
      duration: item.duration,
      thumbnail: item.bestThumbnail,
    };
  });

  return {
    cleaned: returnData,
    debugging: data,
  };
}

// TODO: DElete this
// function getPresentationAuthor(nameTitle, nameType) {
//   let name, presentation, splitTitle;
//   let theTitle = nameTitle;

//   // use case with this dash "–"
//   if (theTitle.includes("–")) {
//     theTitle = theTitle.replaceAll("–", "-");
//   }

//   // TODO: figure out how to get the last element in this pattern
//   // break-dancing - john smith

//   switch (nameType) {
//     case "Name - Presentation":
//     case "Name - Presentation - Venue":
//     case "Venue | Name - Presentation":
//       if (theTitle.includes("-")) {
//         splitTitle = theTitle.split("-");
//         name = splitTitle[0].trim();
//         presentation = splitTitle[1].trim();
//       } else {
//         presentation = theTitle;
//         name = "NO_AUTHOR_NAME";
//       }
//       break;

//     case "Presentation - Name":
//     case "Presentation - Name | Venue":
//       if (theTitle.includes("-")) {
//         // if the array is more than 2
//         splitTitle = theTitle.split("-");

//         if (splitTitle.length > 2) {
//           name = splitTitle.pop();
//           presentation = splitTitle.join(" ");
//         } else {
//           presentation = splitTitle[0].trim();
//           name = splitTitle[1].trim();
//         }
//       } else {
//         presentation = theTitle;
//         name = "NO_AUTHOR_NAME";
//       }

//       break;

//     case "Presentation - Name, Venue":
//       if (theTitle.includes("-") && theTitle.includes(",")) {
//         splitTitle = theTitle.split("-");
//         presentation = splitTitle[0].trim();

//         const splitName = splitTitle[1].split(","); // splitName[1] would be the venue
//         name = splitName[0].trim();
//       } else {
//         presentation = theTitle;
//         name = "NO_AUTHOR_NAME";
//       }

//       break;

//     case "Presentation by Name":
//       if (theTitle.includes("by")) {
//         splitTitle = theTitle.split("by");
//         presentation = splitTitle[0].trim();
//         name = splitTitle[1].trim();
//       } else {
//         presentation = theTitle;
//         name = "NO_AUTHOR_NAME";
//       }

//       break;

//     case "Presentation | Name":
//     case "Presentation | Name | Venue":
//     if (theTitle.includes("|")) {
//         splitTitle = theTitle.split("|");
//         presentation = splitTitle[0].trim();
//         name = splitTitle[1].trim();
//       } else {
//         presentation = theTitle;
//         name = "NO_AUTHOR_NAME";
//       }

//       break;
  

//     case "Name: Presentation - Venue":
//       if (theTitle.includes(":") && theTitle.includes("-")) {

//         splitTitle = theTitle.split(":");
//         let presentationTemp = splitTitle[1].split('-'); 

//         presentation = presentationTemp[0].trim();
//         name = splitTitle[0].trim();

//       } else {
//         presentation = theTitle;
//         name = "NO_AUTHOR_NAME";
//       }

//       break;


//     case "Name: Presentation":
//       if (theTitle.includes(":")) {

//         splitTitle = theTitle.split(":");

//         presentation = splitTitle[1].trim();
//         name = splitTitle[0].trim();

//       } else {
//         presentation = theTitle;
//         name = "NO_AUTHOR_NAME";
//       }

//       break;

//     case "Presentation. Name. Venue":
//       if (theTitle.includes(".")) {
//         splitTitle = theTitle.split(".");
//         presentation = splitTitle[0].trim();
//         name = splitTitle[1].trim();
//       } else {
//         presentation = theTitle;
//         name = "NO_AUTHOR_NAME";
//       }
      

//       break;

//   case "Presentation? Name":
//     if (theTitle.includes("?")) {
//       splitTitle = theTitle.split("?");
//       presentation = splitTitle[0].trim();
//       name = splitTitle[1].trim();
//     } else {
//       presentation = theTitle;
//       name = "NO_AUTHOR_NAME";
//     }
    

//     break;
        
//     case "Presentation":
//     default:
//       presentation = theTitle;
//       name = "NO_AUTHOR_NAME";
//   }

//   return {
//     author: toTitleCase(name),
//     title: presentation,
//   };
// }

// This is the code that always fire

// THE ACTUAL CODE

async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

async function executeEvent() {

  if (!CURRENT_PLAYLIST) {
    console.error("no list available");
    return
  }

  if (DEBUG_RUN_ONE) {
    getThatPlayList(
      destructureIntoPlaylistObject(
        "OpenJS~~~OpenJS Foundation Collaborator Summit, Berlin~~~2019~~~Presentation~~~PLyspMSh4XhLMAIqlh3Z5R6frHMDc7t3eG"
      )
    );
    return;
  }

  for (const playlistItem of CURRENT_PLAYLIST) {
    console.log(playlistItem);
    console.log("starting sleep");
    await sleep(3000);
    getThatPlayList(playlistItem);
    console.log("Got playlist!");
  }
}

executeEvent();

// console.log(jsCongressList);