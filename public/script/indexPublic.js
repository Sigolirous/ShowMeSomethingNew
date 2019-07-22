// defines the Go! button by it id
const button = document.getElementById('showMe')
const gotItButton = document.getElementById('gotItButton')
function finalHandle(status, code){
    document.getElementById('modalHeader').innerText = status
    document.getElementById('modalBodyCode').innerText = code
    document.getElementById('alert').style.display = 'unset'
    document.getElementById('form').style.display = 'none'
    gotItButton.addEventListener('click', ()=>{
        document.getElementById('alert').style.display = 'none'
        document.getElementById('modalHeader').innerText = ''
        document.getElementById('modalBodyCode').innerText = ''
        document.getElementById('form').style.display = 'unset'
    })
}
// handle with the 'click' event
button.addEventListener('click', async randomizeIt =>{
   // get the form value 
   const tags = document.getElementById('tags').value
   // put the const tags into an object to sent it by a post method
   const dataTag = {tags}
   // define the POST method and deal with the data to be send
   const options = {
       method: 'POST',
       headers: {
           'Content-Type':'application/json'
       },
       body: JSON.stringify(dataTag)
   }
   // do the POST request
   const response = await fetch('/api', options)
   // listen to the request rensponse
   const comunicationResult = await response.json()
   if (comunicationResult.status == 'success'){
        // separate the channels sent 
        const channels = comunicationResult.channels
        // to future logs
        // =================== DEBUG FEATURE ===============
        // console.log(channels)
        // =================== DEBUG FEATURE ===============
        // create a empty array that will be used as a roulet
        let separatedLinks = []
        for (var eachchannel in channels){
            // =================== DEBUG FEATURE ===============
            // console.log(channels[eachchannel])
            // =================== DEBUG FEATURE ===============
            //put only the channel link into the array
            separatedLinks.push(channels[eachchannel].channelLink)
        }
        // sort a random link
        const randomPage = Math.floor(Math.random() * Math.floor(separatedLinks.length))
        // redirect the user to the sorted channel
        window.location = String(separatedLinks[randomPage])
        } else{
            finalHandle(comunicationResult.status, comunicationResult.code)
        }
}) 