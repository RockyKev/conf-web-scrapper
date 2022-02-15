const ytpl = require("ytpl");
const { generateFile } = require("./utilities");
// https://www.npmjs.com/package/ytpl

// const playId = "UU_aEa8K-EOJ3D6gOs7HcyNg";

async function getThatPlayList(meta) {
  try {
    console.log("Calling ytpl - pulling songs");
    const { playlistId, conference, year } = meta;

    const songs = await ytpl(playlistId, { pages: 5 });

    const newFilename = `${conference.toLowerCase().replaceAll(" ", "-")}-${year}`;

    generateFile(
      `./cheerio_data/${newFilename}.json`,
      JSON.stringify(cleanTheData(songs, conference, year)),
      false
    );
    console.log("finished");
  } catch (error) {
    console.log(error);
  }
}

function cleanTheData(data, title, year) {
  const items = data.items;

  let returnData = {
    title: title,
    year: year,
    titleOriginal: data.title,
    description: data.description,
  };

  items.forEach((item) => {
    let splitTitle, presentation, author;

    // Title reformatting - this might need it's own function!
    if (item.title.includes("-")) {
      splitTitle = item.title.split("-");
      presentation = splitTitle[0].trim();
      author = splitTitle[1].trim();
    } else if (item.title.includes("|")) {
      splitTitle = item.title.split("|");
      presentation = splitTitle[0].trim();
      author = splitTitle[1].trim();
    } else {
      splitTitle = "";
      presentation = item.title;
      author = "PLEASEFIX";
    }

    returnData[item.id] = {
      title: presentation,
      author: author,
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

console.log("Let's get started");

const playlist = {
  playlistId: "PL0TQYXcAtbwSh9ZbY-34J9XK2fVR23aCl",
  conference: "International JavaScript Conference",
  year: 2019,
};

getThatPlayList(playlist);
