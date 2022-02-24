const { destructureIntoPlaylistObject } = require("../../node_scripts/helpers");

const jsCongressList = [
    destructureIntoPlaylistObject(
        "JS Kongress~~~JS Kongress~~~2016~~~Name: Presentation - Venue~~~PL8ajgHZ7PoCtMSlPCt2TTRyI6dRN3vPCf"
      ),
      destructureIntoPlaylistObject(
        "JS Kongress~~~JS Kongress~~~2017~~~Name: Presentation~~~PL8ajgHZ7PoCt3l5RXoyqVu_r7gYJU0dMx"
      ),
      destructureIntoPlaylistObject(
        "JS Kongress~~~JS Kongress~~~2019~~~Presentation | Name~~~PL8ajgHZ7PoCviKPAFTeYRkp7cDAm6ZC50"
      ),
            
]

module.exports = {
    jsCongressList
}