async function separatingInterest(){
    const tags = document.getElementById('tags').value
    const options = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/api', options)
    const data = await response.json()
}
const button = document.getElementById('showMe')
button.addEventListener('click', async doingStuff =>{
   const tags = document.getElementById('tags').value
   const dataTag = {tags}
   const options = {
       method: 'POST',
       headers: {
           'Content-Type':'application/json'
       },
       body: JSON.stringify(dataTag)
   }
   const response = await fetch('/api', options)
   const comunicationResult = await response.json()
   const chanels = comunicationResult.chanels
   console.log(chanels)
   let separatedLinks = []
   for (var eachChanel in chanels){
       console.log(chanels[eachChanel])
       separatedLinks.push(chanels[eachChanel].chanelLink)
   }
   const randomPage = Math.floor(Math.random() * Math.floor(separatedLinks.length))
   window.location = String(separatedLinks[randomPage])
}) 