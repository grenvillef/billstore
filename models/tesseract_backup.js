var tesseract = require('node-tesseract');

tesseract.process('./models/testimages/out.png', (err, text) => {
    if(err){
        return console.log("An error occured: ", err);
    }

    console.log("Recognized text:");
    // the text variable contains the recognized text
    console.log(text);
});
