!function() {
    var view = document.querySelector('section.message')

    var model = {
        init: function() {
            var APP_ID = 'dV0a9YjtfgEXpL1rYBbCKcti-gzGzoHsz'
            var APP_KEY = 'q6Qtyp5m7PPtTwEwNmj6D28A'

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch: function() {
            var query = new AV.Query('Message')
            //返回Promise对象
            return query.find()
        },
        save: function(name, content) {
            var Message = AV.Object.extend('Message')
            var message = new Message()
            //返回Promise对象
            return message.save({   
                'name': name,
                'content': content
            })
        }
    }

    var controller = {
        view: null,
        messageList: null,
        model: null,
        form: null,
        init: function(view, model) {
            this.view = view
            this.model = model

            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.init()
            this.loadMessageList()
            this.bindEvents()
        },
        
        loadMessageList: function() {
            this.model.fetch().then((message)=> {
                console.log(message)
                let array = message.map((item)=>item.attributes)
                array.forEach((item)=>{
                    console.log(item)
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
            this.model.save(name, content).then(function(object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ' '
                console.log(object)
            })
        }
    }

    controller.init(view, model)
}.call()