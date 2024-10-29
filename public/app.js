
window.addEventListener('load', ()=>{
    document.getElementById('button').addEventListener('click', ()=>{
        let secret = document.getElementById('deposit').value;
        console.log(secret)
        let object = {"secrets": secret}
        let jsonData = JSON.stringify(object)

        fetch('/secrets', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)})
    })
})
document.getElementById('get-tracker').addEventListener('click', ()=>{
    fetch('/getsecrets')
    .then(response=> response.json())
    .then(data =>{
        document.getElementById('secret-info').innerHTML = '';
       console.log(data.data);
       for(let i=0; i<data.data.length;i++){
        let string = data.data[i].date + ":" + data.data[i].secret.secrets
        let element = document.createElement('p')
        element.innerHTML= string;
        document.getElementById('secret-info').appendChild(element);
       }
    })
})
// make a fetch request of type POST to send info to the server
