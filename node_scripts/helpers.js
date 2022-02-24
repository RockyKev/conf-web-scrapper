// This file is more for string things and object generation

function destructureIntoPlaylistObject(string) {
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

const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  module.exports = {
      toTitleCase, 
      destructureIntoPlaylistObject
  }