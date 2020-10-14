const ytsearch = require("youtube-search")

module.exports = async function search(arg, author) {
    let video = await ytsearch(arg, {maxResults: 10, key: process.env.YOUTUBE_KEY})
    if(!video.results.length) return "not results"

    video = video.results.filter(i => i.kind === "youtube#video")[0]
    let description = video.description
    if(description.length > 400) description = description.substring(0,400) + "..."

    const song = {
        title: video.title.replace(/&amp;/g, " &"),
        url: video.link,
        image: video.thumbnails.medium.url,
        desc: description,
        authorName: video.channelTitle,
        videoID: video.id,
        author: author
    }

    return song
}