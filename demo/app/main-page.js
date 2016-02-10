var Observable = require("data/observable").Observable;
var emotions = require("nativescript-emotionrecognition");
var data = new Observable({});
  
 
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = data;
}
exports.pageLoaded = pageLoaded;

function getEmotion(args) {
    try {
        emotions.detectEmotions("http://24.media.tumblr.com/tumblr_m244ixI3ZT1rqmgcuo4_250.gif", "073024995a4d4ccb89db7e1dc03803ba")
       .then(function (result) {
           console.log(result);
           data.set("emotion", result);
       }, function (err) {
           alert(err);
       })
    } catch (ex) {
        console.log(ex);
    }   
}
exports.getEmotion = getEmotion;