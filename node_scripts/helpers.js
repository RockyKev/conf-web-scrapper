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
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function getPresentationAuthor(nameTitle, nameType) {
  let name, presentation, splitTitle;
  let theTitle = nameTitle;

  // use case with this dash "–"
  if (theTitle.includes("–")) {
    theTitle = theTitle.replaceAll("–", "-");
  }

  // TODO: figure out how to get the last element in this pattern
  // break-dancing - john smith

  switch (nameType) {
    case "Name - Presentation":
    case "Name - Presentation - Venue":
    case "Venue | Name - Presentation":
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
    case "Presentation - Name | Venue":
      if (theTitle.includes("-")) {
        // if the array is more than 2
        splitTitle = theTitle.split("-");

        if (splitTitle.length > 2) {
          name = splitTitle.pop();
          presentation = splitTitle.join(" ");
        } else {
          presentation = splitTitle[0].trim();
          name = splitTitle[1].trim();
        }
      } else {
        presentation = theTitle;
        name = "NO_AUTHOR_NAME";
      }

      break;

    case "Presentation - Name, Venue":
      if (theTitle.includes("-") && theTitle.includes(",")) {
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
    case "Presentation | Name | Venue":
      if (theTitle.includes("|")) {
        splitTitle = theTitle.split("|");
        presentation = splitTitle[0].trim();
        name = splitTitle[1].trim();
      } else {
        presentation = theTitle;
        name = "NO_AUTHOR_NAME";
      }

      break;

    case "Name: Presentation - Venue":
      if (theTitle.includes(":") && theTitle.includes("-")) {
        splitTitle = theTitle.split(":");
        let presentationTemp = splitTitle[1].split("-");

        presentation = presentationTemp[0].trim();
        name = splitTitle[0].trim();
      } else {
        presentation = theTitle;
        name = "NO_AUTHOR_NAME";
      }

      break;

    case "Name: Presentation":
      if (theTitle.includes(":")) {
        splitTitle = theTitle.split(":");

        presentation = splitTitle[1].trim();
        name = splitTitle[0].trim();
      } else {
        presentation = theTitle;
        name = "NO_AUTHOR_NAME";
      }

      break;

    case "Presentation. Name. Venue":
      if (theTitle.includes(".")) {
        splitTitle = theTitle.split(".");
        presentation = splitTitle[0].trim();
        name = splitTitle[1].trim();
      } else {
        presentation = theTitle;
        name = "NO_AUTHOR_NAME";
      }

      break;

    case "Presentation? Name":
      if (theTitle.includes("?")) {
        splitTitle = theTitle.split("?");
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
    author: toTitleCase(name),
    title: presentation,
  };
}

module.exports = {
  toTitleCase,
  destructureIntoPlaylistObject,
  getPresentationAuthor
};
