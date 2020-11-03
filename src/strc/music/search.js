const ytsearch = require("youtube-search")
const axios = require("axios")

module.exports = async function search(arg, message) {
    let video = await ytsearch(arg, {maxResults: 10, key: process.env.YOUTUBE_KEY})
    if(!video.results.length) return message.reply("não encontrei nenhum vídeo com esse título ou URL.")

    video = video.results.filter(i => i.kind === "youtube#video")[0]

    const finalResult = axios.get("https://www.googleapis.com/youtube/v3/videos?id=" + video.id + "&key=" + process.env.YOUTUBE_KEY + "&part=snippet&part=contentDetails").then(data => {
        const response = data.data.items[0]

        let description = response.snippet.description
        if(description.length > 400) description = description.substring(0,400) + "..."

        const formatTime = response.contentDetails.duration.replace("PT", "").replace("S", "").replace("M", ":")
        let time = formatTime.split(":")
        !response.contentDetails.duration.startsWith("PT") || time[0].length > 2 ? time = "max" : time.forEach((value, index) => time[index] = value.padStart(2, "0"))

        const song = {
            title: response.snippet.title.replace(/&amp;/g, " &"),
            url: "https://www.youtube.com/watch?v=" + response.id,
            image: response.snippet.thumbnails.medium.url,
            desc: description,
            authorName: response.snippet.channelTitle,
            videoID: response.id,
            time: time === "max" ? time : time.join(":"),
            author: message.author
        }

        return song
    })
    
    const fn = await finalResult
    return fn
}