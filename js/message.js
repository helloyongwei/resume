var APP_ID = 'dV0a9YjtfgEXpL1rYBbCKcti-gzGzoHsz';
var APP_KEY = 'q6Qtyp5m7PPtTwEwNmj6D28A';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var query = new AV.Query('Message')
query.find().then(function(message) {
    console.log(message)
    let array = message.map((item)=>item.attributes)
    array.forEach((item)=>{
        console.log(item)
        let li = document.createElement('li')
        li.innerText = `${item.name}: ${item.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
    })
}, function(error) {
    console.log(error)
})

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let content = myForm.querySelector('input[name=content]').value
    let name = myForm.querySelector('input[name=name]').value
    var Message = AV.Object.extend('Message')
    var message = new Message()
    message.save({
        'name': name,
        'content': content
    }).then(function(object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ' '
        console.log(object)
    })
})