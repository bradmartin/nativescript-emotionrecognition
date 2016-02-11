var imageSource = require("image-source");
var enums = require("ui/enums");
var fs = require("file-system");
var http = require("http");

var emotionRecUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";

function detectEmotions(image, OcpApimSubscriptionKey) {
    return new Promise(function (resolve, reject) {


        console.log('image sent: ' + image);

        try {

            if (image) {
                var isUrl = false;
                var headerData = null;
                var contentHeader = null;

                if (image.indexOf("://") !== -1) {
                    if (image.indexOf('res://') === -1) {
                        isUrl = true;
                    }
                }

                if (!isUrl) {
                    var currentPath = fs.knownFolders.currentApp().path;

                    if (image[1] === '/' && (image[0] === '.' || image[0] === '~')) {
                        image = image.substr(2);
                    }

                    if (image[0] !== '/') {
                        image = currentPath + '/' + image;
                    }

                    // take image to base64
                    var x = imageSource.fromFileOrResource(image);
                    console.log(x);
                    var base64 = x.toBase64String(enums.ImageFormat.jpg);

                    headerData = { "Content-Type": "application/octet-stream", "Ocp-Apim-Subscription-Key": OcpApimSubscriptionKey }
                    contentHeader = base64;


                } else {
                    headerData = { "Content-Type": "application/json", "Ocp-Apim-Subscription-Key": OcpApimSubscriptionKey };
                    contentHeader = JSON.stringify({ "url": image });
                }

                // Make request
                http.request({
                    url: emotionRecUrl,
                    method: "POST",
                    headers: headerData,
                    content: contentHeader
                }).then(function (response) {
                    resolve(response.content);                    
                }, function (e) {
                    reject(e);
                });

            } else {
                reject("No image argument sent to detectEmotions()");
            }

        } catch (ex) {

            console.log("Error in emotionrecognition.js .getEmotions(): " + ex);
            reject(ex);

        }

    });  
}
exports.detectEmotions = detectEmotions;