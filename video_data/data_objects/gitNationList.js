const { destructureIntoPlaylistObject } = require("../../node_scripts/helpers");

// useless
// const theGitNationTalksList = [
//   destructureIntoPlaylistObject(
//     "JavaScript Conferences by GitNation~~~JavaScript Frontend Talks~~~2020~~~Presentation - Name~~~PLfIM4SvaiIyxT5-wqb5o9lucx84mXy0qU"
//   ),
//   destructureIntoPlaylistObject(
//     "JavaScript Conferences by GitNation~~~TypeScript Talks~~~2020~~~Presentation - Name~~~PLfIM4SvaiIyxn9WDU5v15KKsJbRqluoH_"
//   ),
//   destructureIntoPlaylistObject(
//     "JavaScript Conferences by GitNation~~~JavaScript Testing Talks~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyxZWVuZZr_lRvLa9E2mRBgq"
//   ),
//   destructureIntoPlaylistObject(
//     "JavaScript Conferences by GitNation~~~Node.js Talks~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyzgM4KAW2cejoq2-nzEaSfQ"
//   ),
//   destructureIntoPlaylistObject(
//     "JavaScript Conferences by GitNation~~~JavaScript API Talks~~~2020~~~Presentation - Name~~~PLfIM4SvaiIyyYPn-in97UR_sHtQt_eNmG"
//   ),
// ]

const theGitNationList = [
    destructureIntoPlaylistObject(
      "JavaScript Conferences by GitNation~~~AmsterdamJS Conference~~~2017~~~Presentation - Name~~~PLfIM4SvaiIyzaLhvwGEa4QzPb9oTD0Ioc"
    ),
    destructureIntoPlaylistObject(
      "JavaScript Conferences by GitNation~~~JSNation Conference~~~2018~~~Presentation - Name~~~PLfIM4SvaiIywIr04DZs6NHNq_G4S_2hro"
    ),
    destructureIntoPlaylistObject(
      "JavaScript Conferences by GitNation~~~JSNation Conference~~~2019~~~Presentation - Name~~~PLfIM4SvaiIyygQEe2WPpENwxIf-0agBr9"
    ),
    destructureIntoPlaylistObject(
      "JavaScript Conferences by GitNation~~~JSNation Live Conference~~~2020~~~Presentation - Name~~~PLfIM4SvaiIyySUvx7L8PXNl5nqM9x_dXC"
    ),
    destructureIntoPlaylistObject(
      "JavaScript Conferences by GitNation~~~TestJS Summit~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyyIfaGCY6c5bt0EBVV_hXGy"
    ),
    destructureIntoPlaylistObject(
      "JavaScript Conferences by GitNation~~~Node Congress~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyxqwCkTyBfo2NjBbacK-eJS"
    ),
    destructureIntoPlaylistObject(
      "JavaScript Conferences by GitNation~~~DevOps.js~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyxBv7CF4VZMlE3F7GTz6ssI"
    ),
    destructureIntoPlaylistObject(
      "JavaScript Conferences by GitNation~~~JSNation Live Conference~~~2021~~~Presentation - Name~~~PLfIM4SvaiIyyQUbLvImHltKD1dCp6YH9u"
    ),
    destructureIntoPlaylistObject(
      "JavaScript Conferences by GitNation~~~VUe.js Live~~~2021~~~Presentation - Name, Venue~~~PLfIM4SvaiIyyRQB2Ga9YxNxGFRSmtSeZ9"
    ),
    destructureIntoPlaylistObject(
      "JavaScript Conferences by GitNation~~~TestJS Summit~~~2021~~~Presentation - Name, Venue~~~PLfIM4SvaiIywKQCWi9Pd6WtGd8Q8C5rOe"
    ),
  ];
  
module.exports = {
  theGitNationList
}