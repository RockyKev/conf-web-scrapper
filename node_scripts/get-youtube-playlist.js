const ytpl = require("ytpl");
const { generateFile } = require("./utilities");
// https://www.npmjs.com/package/ytpl

// const playId = "UU_aEa8K-EOJ3D6gOs7HcyNg";

async function getThatPlayList() {
  console.log("here we go!");

  try {
    const songs = await ytpl(playId, { pages: 5 });

    console.log("im in try");

    // cleanTheData(songs);

    generateFile("./cheerio_data/test.json",  JSON.stringify(cleanTheData(songs)));
    console.log("finished");
  } catch (error) {
    console.log(error);
  }
}

function cleanTheData(data) {
  const items = data.items;

  let returnData = {
    title: "conference",
    year: 2020,
  };

  items.forEach((item) => {
    // title format - maybe cleaning too?
    returnData[item.id] = {
      title: item.title,
      shortUrl: item.shortUrl,
      duration: item.duration,
    };
  });

  return  returnData;
}

getThatPlayList();
