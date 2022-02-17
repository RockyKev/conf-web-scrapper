const ytpl = require("ytpl");
const { generateFile } = require("./utilities");
// https://www.npmjs.com/package/ytpl

// const playId = "UU_aEa8K-EOJ3D6gOs7HcyNg";
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
      .replaceAll(" ", "-")}-${year}`;

    generateFile(
      `./video_data/${newFilename}.json`,
      JSON.stringify(
        cleanTheData(songs, conferenceOwner, conference, year, namingType)
      ),
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
    // let splitTitle, presentation, author;

    let presentation = getPresentationAuthor(item.title, namingType);

    // Title reformatting - this might need it's own function!
    // if (item.title.includes("-")) {
    //   splitTitle = item.title.split("-");
    //   presentation = splitTitle[0].trim();
    //   author = splitTitle[1].trim();
    // } else if (item.title.includes("|")) {
    //   splitTitle = item.title.split("|");
    //   presentation = splitTitle[0].trim();
    //   author = splitTitle[1].trim();
    // } else {
    //   splitTitle = "";
    //   presentation = item.title;
    //   author = "PLEASEFIX";
    // }

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

function getPresentationAuthor(theTitle, nameType) {
  let name, presentation, splitTitle;

  switch (nameType) {
    case "Name - Presentation":
      if (theTitle.includes("-")) {
        splitTitle = theTitle.split("-");
        name = splitTitle[0].trim();
        presentation = splitTitle[1].trim();
      } else {
        presentation = theTitle;
        name = "NO AUTHOR NAME";
      }
      break;
    case "Presentation - Name":
      if (theTitle.includes("-")) {
        splitTitle = theTitle.split("-");
        presentation = splitTitle[0].trim();
        name = splitTitle[1].trim();
      } else {
        presentation = theTitle;
        name = "NO AUTHOR NAME";
      }

      break;

    case "Presentation by Name":
      if (theTitle.includes("by")) {
        splitTitle = theTitle.split("by");
        presentation = splitTitle[0].trim();
        name = splitTitle[1].trim();
      } else {
        presentation = theTitle;
        name = "NO AUTHOR NAME";
      }

      break;
    case "Presentation | Name":
      if (theTitle.includes("|")) {
        splitTitle = theTitle.split("|");
        presentation = splitTitle[0].trim();
        name = splitTitle[1].trim();
      } else {
        presentation = theTitle;
        name = "NO AUTHOR NAME";
      }

      break;

    case "Presentation":
    default:
      presentation = theTitle;
      name = "NO AUTHOR NAME";

  }

  return {
    author: name,
    title: presentation,
  };
}

console.log("Let's get started");

// const playlist = {
//   playlistId: "PL0TQYXcAtbwSh9ZbY-34J9XK2fVR23aCl",
//   conferenceOwner: "International JavaScript Conference",
//   conference: "International JavaScript Conference",
//   year: 2019,
//   namingType: 'Presentation | Name',
// };

function generateListObject(string) {
  const splitString = string.split("~~~");
  const conferenceOwner = splitString[0].trim();
  const conference = splitString[1].trim();
  const year = splitString[2].trim();
  const namePattern = splitString[3].trim();
  const playListId = splitString[4].trim();

  return {
    playlistId: playListId,
    conferenceOwner: conferenceOwner,
    conference: conference,
    year: year,
    namingType: namePattern,
  };

  // this isn't used yet
// const masterList = [{
//   playlistId: "PL0TQYXcAtbwSh9ZbY-34J9XK2fVR23aCl",
//   conferenceOwner: "International JavaScript Conference",
//   conference: "International JavaScript Conference",
//   year: 2019,
//   namingType: 'Presentation | Name',
// }
// ]

}



const theOpenJSList = [
  // generateListObject("OpenJS~~~OpenJS Foundation Collaborator Summit, Berlin~~~2019~~~Presentation~~~PLyspMSh4XhLMAIqlh3Z5R6frHMDc7t3eG"),
  generateListObject("OpenJS~~~Node + JS Interactive~~~2019~~~Presentation - Name~~~PLyspMSh4XhLPKZxHu3ZzbUXO4WW-40g17"),
  // generateListObject("OpenJS~~~OpenJS World~~~2020~~~Presentation - Name~~~PLyspMSh4XhLP-mqulUMcaqTbLo-ZJxSX5"),
  // generateListObject("OpenJS~~~OpenJS World~~~2021~~~Presentation - Name~~~PLyspMSh4XhLNU9RWjXqdNOp3NXM3NWdF_"),
];


// This is the code that always fire
const makeExecute = theOpenJSList;


async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

async function executeEvent() {

  for (const event of makeExecute) {
    console.log(event);
    console.log("starting sleep");
    await sleep(3000);
    getThatPlayList(event);
    console.log("Got playlist!")
  }
}

executeEvent();

