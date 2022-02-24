const ytpl = require("ytpl");
const { generateFile } = require("./utilities");
// https://www.npmjs.com/package/ytpl

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
    generateFile(`./video_data/full/${newFilename}.json`, JSON.stringify(dataFull), false);
    generateFile(`./video_data/clean/${newFilename}.json`, JSON.stringify(dataClean), false);

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

function getPresentationAuthor(nameTitle, nameType) {
  let name, presentation, splitTitle;
  let theTitle = nameTitle;

  // use case with this dash "–" 
  if (theTitle.includes("–")) {
    theTitle = theTitle.replaceAll("–", "-")
  }   

  // TODO: figure out how to get the last element in this pattern
  // break-dancing - john smith


  switch (nameType) {
    case "Name - Presentation":
      if (theTitle.includes("-")) {
        splitTitle = theTitle.split("-");
        name = splitTitle[0].trim();
        presentation = splitTitle[1].trim();
      } else {
        presentation = theTitle;
        name = "NO_AUTHOR_NAME";
      }
      break;
    case "Presentation - Name":
      if (theTitle.includes("-")) {
        splitTitle = theTitle.split("-");
        presentation = splitTitle[0].trim();
        name = splitTitle[1].trim();
      } else {
        presentation = theTitle;
        name = "NO_AUTHOR_NAME";
      }

      break;

    case "Presentation - Name, Venue":
      if (theTitle.includes("-")) {
        splitTitle = theTitle.split("-");
        presentation = splitTitle[0].trim();

        const splitName = splitTitle[1].split(","); // splitName[1] would be the venue
        name = splitName[0].trim();
      } else {
        presentation = theTitle;
        name = "NO_AUTHOR_NAME";
      }

      break;

    case "Presentation by Name":
      if (theTitle.includes("by")) {
        splitTitle = theTitle.split("by");
        presentation = splitTitle[0].trim();
        name = splitTitle[1].trim();
      } else {
        presentation = theTitle;
        name = "NO_AUTHOR_NAME";
      }

      break;
    case "Presentation | Name":
      if (theTitle.includes("|")) {
        splitTitle = theTitle.split("|");
        presentation = splitTitle[0].trim();
        name = splitTitle[1].trim();
      } else {
        presentation = theTitle;
        name = "NO_AUTHOR_NAME";
      }

      break;

    case "Presentation":
    default:
      presentation = theTitle;
      name = "NO_AUTHOR_NAME";
  }

  return {
    author: name,
    title: presentation,
  };
}

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

// TODO: turn this into export files that you import in

const theOpenJSList = [
  generateListObject("OpenJS~~~OpenJS Foundation Collaborator Summit, Berlin~~~2019~~~Presentation~~~PLyspMSh4XhLMAIqlh3Z5R6frHMDc7t3eG"),
  generateListObject("OpenJS~~~Node + JS Interactive~~~2019~~~Presentation - Name~~~PLyspMSh4XhLPKZxHu3ZzbUXO4WW-40g17"),
  generateListObject("OpenJS~~~OpenJS World~~~2020~~~Presentation - Name~~~PLyspMSh4XhLP-mqulUMcaqTbLo-ZJxSX5"),
  generateListObject("OpenJS~~~OpenJS World~~~2021~~~Presentation - Name~~~PLyspMSh4XhLNU9RWjXqdNOp3NXM3NWdF_"),
];

// useless
// const theGitNationTalksList = [
//   generateListObject(
//     "JavaScript Conferences by GitNation~~~JavaScript Frontend Talks~~~2020~~~Presentation - Name~~~PLfIM4SvaiIyxT5-wqb5o9lucx84mXy0qU"
//   ),
//   generateListObject(
//     "JavaScript Conferences by GitNation~~~TypeScript Talks~~~2020~~~Presentation - Name~~~PLfIM4SvaiIyxn9WDU5v15KKsJbRqluoH_"
//   ),
//   generateListObject(
//     "JavaScript Conferences by GitNation~~~JavaScript Testing Talks~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyxZWVuZZr_lRvLa9E2mRBgq"
//   ),
//   generateListObject(
//     "JavaScript Conferences by GitNation~~~Node.js Talks~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyzgM4KAW2cejoq2-nzEaSfQ"
//   ),
//   generateListObject(
//     "JavaScript Conferences by GitNation~~~JavaScript API Talks~~~2020~~~Presentation - Name~~~PLfIM4SvaiIyyYPn-in97UR_sHtQt_eNmG"
//   ),
// ]

const theGitNationList = [
  generateListObject(
    "JavaScript Conferences by GitNation~~~AmsterdamJS Conference~~~2017~~~Presentation - Name~~~PLfIM4SvaiIyzaLhvwGEa4QzPb9oTD0Ioc"
  ),
  generateListObject(
    "JavaScript Conferences by GitNation~~~JSNation Conference~~~2018~~~Presentation - Name~~~PLfIM4SvaiIywIr04DZs6NHNq_G4S_2hro"
  ),
  generateListObject(
    "JavaScript Conferences by GitNation~~~JSNation Conference~~~2019~~~Presentation - Name~~~PLfIM4SvaiIyygQEe2WPpENwxIf-0agBr9"
  ),
  generateListObject(
    "JavaScript Conferences by GitNation~~~JSNation Live Conference~~~2020~~~Presentation - Name~~~PLfIM4SvaiIyySUvx7L8PXNl5nqM9x_dXC"
  ),
  generateListObject(
    "JavaScript Conferences by GitNation~~~TestJS Summit~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyyIfaGCY6c5bt0EBVV_hXGy"
  ),
  generateListObject(
    "JavaScript Conferences by GitNation~~~Node Congress~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyxqwCkTyBfo2NjBbacK-eJS"
  ),
  generateListObject(
    "JavaScript Conferences by GitNation~~~DevOps.js~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyxBv7CF4VZMlE3F7GTz6ssI"
  ),
  generateListObject(
    "JavaScript Conferences by GitNation~~~JSNation Live Conference~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyyQUbLvImHltKD1dCp6YH9u"
  ),
  generateListObject(
    "JavaScript Conferences by GitNation~~~VUe.js Live~~~2021~~~Presentation - Name, Venue~~~PLfIM4SvaiIyyRQB2Ga9YxNxGFRSmtSeZ9"
  ),
  generateListObject(
    "JavaScript Conferences by GitNation~~~TestJS Summit~~~2021~~~Presentation - Name, Venue~~~PLfIM4SvaiIywKQCWi9Pd6WtGd8Q8C5rOe"
  ),
];

// This is the code that always fire


// THE ACTUAL CODE

const CURRENT_PLAYLIST = '';
const DEBUG_RUN_ONE = false;

async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

async function executeEvent() {

  if (DEBUG_RUN_ONE) {
    getThatPlayList(  generateListObject("OpenJS~~~OpenJS Foundation Collaborator Summit, Berlin~~~2019~~~Presentation~~~PLyspMSh4XhLMAIqlh3Z5R6frHMDc7t3eG"));
    return 
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
