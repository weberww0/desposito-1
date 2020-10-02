const fs = require("fs")
module.exports = async (desposito) => {
    console.log("Estou pronto como " + desposito.user.tag + "!")
    desposito.user.setStatus("idle")

    function generateOutputFile(channel, member) {
        // use IDs instead of username cause some people have stupid emojis in their name
        const fileName = `./src/recordings/${member.id}.pcm`;
        return fs.createWriteStream(fileName);
      }
    
      const voiceChannel = desposito.guilds.cache.get("637990689140899844").channels.cache.get("716420912232267849")
      const voiceChannel2 = desposito.guilds.cache.get("637767649052327958").channels.cache.get("700816110294925373")
        //console.log(voiceChannel.id);
        const connn = await voiceChannel2.join()
        if (!voiceChannel || voiceChannel.type !== 'voice') {
          return console.log(`I couldn't find the channel Can you spell?`);
        }
        const conn = await voiceChannel.join()
        console.log(conn)

            conn.on('speaking', (user, speaking) => {
                const receiver = conn.receiver.createStream(user.id)
                connn.play(receiver, { type: 'opus' })
                console.log(receiver)
                console.log(`I'm listening to ${user}`);
                // this creates a 16-bit signed PCM, stereo 48KHz PCM stream.
                // create an output stream so we can dump our data in a file
                const outputStream = generateOutputFile(voiceChannel, user);
                // pipe our audio data into the file stream
                receiver.pipe(outputStream);
                outputStream.on("data", console.log);
                // when the stream ends (the user stopped talking) tell the user
                receiver.on('end', () => {
                  console.log(`I'm no longer listening to ${user}`);
                });
          })
    
}