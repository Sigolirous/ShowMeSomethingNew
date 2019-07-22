const submitChanelButton = document.getElementById('submit')
submitChanelButton.addEventListener('click', async ()=>{
    const chanelLink = document.getElementById('chanelLink').value
    const tag1 = document.getElementById('tag1').value
    const tag2 = document.getElementById('tag2').value
    const tag3 = document.getElementById('tag3').value
    const chanelsInformation = [chanelLink, tag1, tag2, tag3]
    console.log(chanelsInformation)
    const dataTag = {chanelsInformation}
    const options = {
       method: 'POST',
       headers: {
           'Content-Type':'application/json'
       },
       body: JSON.stringify(dataTag)
   }
   const response = await fetch('/api', options)
   const comunicationResult = await response.json()
   console.log(comunicationResult)
   if(comunicationResult.status == 'error'){
       alert(comunicationResult.code)
       document.getElementById('chanelLink').value = ''
       document.getElementById('tag1').value = ''
       document.getElementById('tag2').value = ''
       document.getElementById('tag3').value = ''
   }else{
       alert('Succefully action')
       document.getElementById('chanelLink').value = ''
       document.getElementById('tag1').value = ''
       document.getElementById('tag2').value = ''
       document.getElementById('tag3').value = ''
   }
   
})