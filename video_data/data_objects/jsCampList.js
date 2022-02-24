const { destructureIntoPlaylistObject } = require("../../node_scripts/helpers");

const jsCampList = [
  destructureIntoPlaylistObject("Jscamp~~~AngularCamp~~~2016~~~Presentation by Name~~~PLB17qI-lepyhSdXvjSupwSMAMmOxpciUl"),
  destructureIntoPlaylistObject("Jscamp~~~AngularCamp~~~2017~~~Presentation | Name~~~PLB17qI-lepyhiKF5sy6P46Vqj4crwuoDU"),
  destructureIntoPlaylistObject("Jscamp~~~JSCamp Barcelona~~~2018~~~Presentation by Name~~~PLB17qI-lepyhGQCeq1bGawXeftOYMZtRj"),
  destructureIntoPlaylistObject("Jscamp~~~JSCamp Barcelona~~~2019~~~Presentation by Name | Venue~~~PLB17qI-lepyi5DeCsXSj5m1BWKsqU2DSP"),
  destructureIntoPlaylistObject("Jscamp~~~JSCamp Virtual~~~2021~~~Presentation by Name | Venue~~~PLB17qI-lepyhV2wDFQP5S-YXDjb5jAG4B"),

];
  
  
module.exports = {
  jsCampList
}