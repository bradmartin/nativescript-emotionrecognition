var imageSource = require("image-source");
var fs = require("file-system");
var http = require("http");

var emotionRecUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";

function detectEmotions(image, OcpApimSubscriptionKey) {
    return new Promise(function (resolve, reject) {


        try {

            if (image) {
                var isUrl = false;
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
                    //image = imageSource.ImageSource.toBase64String()
                    // set contentHeader here for binary image data

                } else {
                    contentHeader = JSON.stringify({ "url": image });
                }

                // Make request
                http.request({
                    url: emotionRecUrl,
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Ocp-Apim-Subscription-Key": OcpApimSubscriptionKey },
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