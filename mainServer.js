const express = require('express')
const Datastore = require('nedb')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
db = new Datastore({ filename: 'database.db', autoload: true})
// initialize server at "port"
app.listen(port, ()=>{
    console.log (`listening at port ${port}`)
})
// initialize server post
app.use (express.static('public'))
app.use(express.json({limit: '1mb'}))
// deal with post
app.post('/api', async (request, response) => {
    console.log('I got a request')
    // body receiv the body of the post. In this case, the tags tha may be possible sent by ./script/indexPublic.js
    const body = request.body
    // get the tag sent by the ./script/indexPublic.js if tag exist
    tag = body.tags
    // check ig tag exist. If it exist, it means that the post came from ./script/indexPublic.js, if it doenst, the post came from ./script/sendchannel.js
    if (tag != undefined){
        //the post came from ./script/indexPublic.js
        //get the tag, querry it into the database end send the results to the client
        db.find({tags: tag}, async(err, items)=>{
            if (Array.isArray(items) && items.length != 0){
                response.json({
                    status: 'success',
                    channels: items, 
                })
                console.log(items)
            } else {
                response.json({
                    status: 'Error',
                    code: 'This tag doenst correspond to any of our channels. You can add your favorit channel clicking the Send a channel button.', 
                    
                })
            }
            
        })
    }else{
        //the post came from ./script/sendchannel.js
        // get the form data
        channelsInformation = body.channelsInformation
        channelsLink = body.channelsInformation[0]
        channelsLink = String(channelsLink)
        // put tag1, tag2 and tag3 into an single array to send it to the database
        channelsTag = [body.channelsInformation[1], body.channelsInformation[2], body.channelsInformation[3]]
        // logs the data (for future implementation of a log system)
        console.log(`All channel's informations: ${channelsInformation}`)
        console.log(`channel's link: ${channelsLink}`)
        console.log(`First channel's tags: ${channelsTag[0]}`)
        console.log(`Second channel's tags: ${channelsTag[1]}`)
        console.log(`Third channel's tags: ${channelsTag[2]}`)
        //checks if the insert link is a valid youtube link
        const validateLinkRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/
        const validationResult = validateLinkRegex.test(channelsLink)
        if(validationResult == true){
            // valid yutube link
            // check if the link already exist into the database
            db.find({channelLink: channelsLink}, (err, data)=> {
                // check if the link already exist into the database
                if(Array.isArray(data) && data.length != 0){
                    // the link already exist into the database
                    response.json({
                        status: 'Error 😕',
                        code: 'Thanks but the channel has been uploaded into the site already. Try to add another one, it will be a pleasure to us meet your favorit channel',
                    })
                    //return the error messenge (future log impletentation)
                    console.log('The channels has been uploaded into the site already')
                }else{
                    // the link doesnt exist into the database
                    // create a objet with link and tags
                    let newchannel = {channelLink:channelsLink,
                                    tags: channelsTag}
                    // insert the objet into the database
                    db.insert(newchannel, (err, newDoc)=>{
                    console.log(`Inserting the channel ${newchannel} into the database.`)
                    })
                    response.json({
                        // return a success message to the client
                        status: 'Success 😋',
                        code: 'Channel added into our database. Thanks!'
                    })   
                }
            })
        }else{
            //the link inst a youtube link
            response.json({
                // return the error and the error code
                status: 'Error 😯',
                code: "The input is not a valid youtube link. Didn't you misspelled it?",
            })
            // return the error to future logs
            console.log("Error: this is not a valid youtube link")
        }

    }
    
})