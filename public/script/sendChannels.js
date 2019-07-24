// set the submit button
const submitchannelButton = document.getElementById('submit')
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
submitchannelButton.addEventListener('click', async ()=>{
    // get the form values
    const channelLink = document.getElementById('channelLink').value
    const tag1 = document.getElementById('tag1').value.toLowerCase().trim()
    const tag2 = document.getElementById('tag2').value.toLowerCase().trim()
    const tag3 = document.getElementById('tag3').value.toLowerCase().trim()
    if (tag1 == '' || tag2 == '' || tag3 == '' || tag1 == tag2 || tag1 == tag3 || tag2 == tag3){
        finalHandle('Error 🙈', 'Aparently, there is one tag empty or equal to another. Feel free to try agai!')
    }else{
    // put all the data into a single array
    const channelsInformation = [channelLink, tag1.toLowerCase(), tag2.toLowerCase(), tag3.toLowerCase()]
    // =================== DEBUG FEATURE ===============
    // console.log(channelsInformation)
    // =================== DEBUG FEATURE ===============
    // put the array containing data into a object to sent it by post method
    const dataTag = {channelsInformation}
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
   // future logs
   // =================== DEBUG FEATURE ===============
   //console.log(comunicationResult)
   // =================== DEBUG FEATURE ===============
   // check if it has some error in the request
   if(comunicationResult.status == 'error'){
        // theres an error
        // future logs
        // =================== DEBUG FEATURE ===============
        // console.log(comunicationResult.code)
        // =================== DEBUG FEATURE ===============
        // send the error code to the client
        finalHandle(comunicationResult.status, comunicationResult.code)
        // clean the form
        document.getElementById('channelLink').value = ''
        document.getElementById('tag1').value = ''
        document.getElementById('tag2').value = ''
        document.getElementById('tag3').value = ''
   }else{
       // theres no error
       // send the message that the new channel has been included into the database
       finalHandle(comunicationResult.status, comunicationResult.code)
       // future logs
       // =================== DEBUG FEATURE ===============
       //console.log(comunicationResult.status)
       // =================== DEBUG FEATURE ===============
       // clear the form
       document.getElementById('channelLink').value = ''
       document.getElementById('tag1').value = ''
       document.getElementById('tag2').value = ''
       document.getElementById('tag3').value = ''
   }
    }
})
