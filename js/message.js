!function() {
    var view = View('section.message')

    var model = Model({resourceName: 'Message'})

    var controller = Controller({
        init: function(view, model) {
            this.view = view
            this.model = model

            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.loadMessageList()
        },
        
        loadMessageList: function() {
            this.model.fetch().then((message)=> {
                // console.log(message)
                let array = message.map((item)=>item.attributes)
                array.forEach((item)=>{
                    // console.log(item)
                    let li = document.createElement('li')
                    li.innerText = `${item.name}: ${item.content}`
                    let messageList = document.querySelector('#messageList')
                    this.messageList.appendChild(li)
                })
            }, function(error) {
                console.log(error)
            })
        },
        bindEvents: function() {
            // console.log(this.form)
            this.form.addEventListener('submit', (e)=> {
                e.preventDefault()
                // console.log(this)
                this.saveMessage()
            })
        },
        saveMessage: function() {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save({'name': name, 'content': content}).then(function(object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ' '
                // console.log(object)
            })
        }
    })

    controller.init(view, model)
}.call()