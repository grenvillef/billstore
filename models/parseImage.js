var tesseract = require('node-tesseract');

var options = {
    // Use the english and german languages
    l: 'eng+nld',
    // Use the segmentation mode #6 that assumes a single uniform block of text.
    psm: 6,

	config: 'receipts'

};

tesseract.process('../models/testimages/ah2_1.jpg',options, (err, text) => {
    if(err){
        return console.log("An error occured: ", err);
    }
   
    console.log("Recognized text");
    // the text variable contains the recognized text
    console.log(text);

	console.log("Total price is");
	console.log(text.substring(text.indexOf('\nTOTAAL')+8,text.indexOf('\nTOTAAL')+15));
});
