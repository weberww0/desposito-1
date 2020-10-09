const ytsearch = require("youtube-search")

module.exports = async function search(arg, author) {
    let video = await ytsearch(arg, {maxResults: 10, key: process.env.YOUTUBE_KEY})
    if(!video.results.length) {
        const YT = require("simple-youtube-api")
        const yt = new YT(process.env.YOUTUBE_KEY)
        return yt.getPlaylist("https://www.youtube.com/playlist?list=RDQGFmWbqc_T0&feature=share&playnext=1").then(async playlist => {
            const videos = await playlist.getVideos()
            const arrayOfVideos = Object.values(videos)
            return arrayOfVideos.map(v => v.title)
        }).catch(err => {return "not results"})
    } 

    video = video.results.filter(i => i.kind === "youtube#video")

    let description = video[0].description
    if(description.length > 400) description = description.substring(0,400) + "..."

    const song = {
        title: video[0].title.replace(/&amp;/g, " &"),
        url: video[0].link,
        image: video[0].thumbnails.medium.url,
        desc: description,
        authorName: video[0].channelTitle,
        videoID: video[0].id,
        author: author
    }

    return song
}