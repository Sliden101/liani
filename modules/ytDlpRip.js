const youtubedl = require('youtube-dl-exec');
const logger = require()();
async function videoRip(srcUrl){
    const promise = youtubedl(srcUrl, {
        dumpSingleJson: true
    }).then(output => {
        console.log('Downloaded!')
        console.log(output)
    }).catch(err => {
        console.error(err)
    });
    const result = await logger(promise, `Obtaining ${srcUrl}`)
    
    console.log(result);   

}
module.exports = {
    videoRip
}
