const youtubedl = require('youtube-dl-exec')

async function videoRip(srcUrl){
    youtubedl(srcUrl, {
        //quiet : true,
        //progress: true,
        //Will implement progress tracker later
    }).then(output => {
        console.log('Downloaded!')
        console.log(output)
    }).catch(err => {
        console.error(err)
    });
    console.log('Downloading...')   
}
module.exports = {
    videoRip
}
