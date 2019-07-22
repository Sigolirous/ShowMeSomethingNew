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
app.post('/api', async (request, response) => {
    console.log('I got a request')
    const body = request.body
    // console.log(body.tags)
    tag = body.tags
    if (tag != undefined){
        db.find({tags: tag}, async(err, items)=>{
            response.json({
                status: 'success',
                chanels: items, 
                
            })
            console.log(items)
        })
    }else{
        chanelsInformation = body.chanelsInformation
        chanelsLink = body.chanelsInformation[0]
        chanelsLink = String(chanelsLink)
        chanelsTag = [body.chanelsInformation[1], body.chanelsInformation[2], body.chanelsInformation[3]]
        console.log(`All chanel's informations: ${chanelsInformation}`)
        console.log(`Chanel's link: ${chanelsLink}`)
        console.log(`First chanel's tags: ${chanelsTag[0]}`)
        console.log(`Second chanel's tags: ${chanelsTag[1]}`)
        console.log(`Third chanel's tags: ${chanelsTag[2]}`)
        const validateLinkRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/
        const validationResult = validateLinkRegex.test(chanelsLink)
        if(validationResult == true){
            db.find({chanelLink: chanelsLink}, (err, data)=> {
                if(Array.isArray(data) && data.length != 0){
                    response.json({
                        status: 'error',
                        code: 'The chanels has been uploaded into the site already',
                    })
                    console.log('The chanels has been uploaded into the site already')
                }else{
                    let newChanel = {chanelLink:chanelsLink,
                                    tags: chanelsTag}
                    db.insert(newChanel, (err, newDoc)=>{
                    console.log(`Inserting the chanel ${newChanel} into the database.`)
                    })
                    response.json({
                        status: 'success',
                    })   
                }
            })
        }else{
            response.json({
                status: 'error',
                code: 'The input is not a valid youtube link',
            })
            console.log("Error: this is not a valid youtube link")
        }

    }
    
})