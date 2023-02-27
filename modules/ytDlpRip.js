const youtubedl = require('youtube-dl-exec')
const logger = require('progress-estimator')()

async function videoRip(srcUrl){
    const promise = youtubedl(srcUrl, {
        dumpSingleJson: true 
    })
    const progress = await logger(promise, `Obtaining ${url}`)
    console.log(progress)
}
module.exports = {
    videoRip
}
