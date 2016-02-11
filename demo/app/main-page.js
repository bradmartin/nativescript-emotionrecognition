var Observable = require("data/observable").Observable;
var emotions = require("nativescript-emotionrecognition");
var frame = require("ui/frame");
var data = new Observable({});
  
 
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = data;
}
exports.pageLoaded = pageLoaded;

function getEmotion(args) {
    var img = frame.topmost().currentPage.getViewById("pic");
    var imageSrc = img.src;
    try {
        emotions.detectEmotions(imageSrc, "073024995a4d4ccb89db7e1dc03803ba")
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