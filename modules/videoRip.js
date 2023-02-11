const youtubedl = require('youtube-dl-exec')

async function videoRip(srcUrl){
    youtubedl(srcUrl, {
        //quiet : true,
        //progress: true,
        //Will implement progress tracker later
    }).then(output => {
        console.log('Downloading...')
        console.log(output)
    }).catch(err => {
        console.error(err)
    });
    console.log('Downloaded!')   
}
module.exports = {
    videoRip
}