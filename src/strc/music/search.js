const ytsearch = require("youtube-search")

module.exports = async function search(arg, author) {
    const video = await ytsearch(arg, {maxResults: 1, key: process.env.YOUTUBE_KEY})
    if(!video.results.length) return "not results"

    let description = video.results[0].description
    if(description.length > 400) description = description.substring(0,400) + "..."

    const song = {
        title: video.results[0].title.replace(/&amp;/g, " &"),
        url: video.results[0].link,
        image: video.results[0].thumbnails.medium.url,
        desc: description,
        authorName: video.results[0].channelTitle,
        videoID: video.results[0].id,
        author: author
    }

    return song
}