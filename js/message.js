!function () {
    var view = document.querySelector('section.message')
    
    var model = {
        // 初始化
        init: function () {
            var APP_ID = 'z1CIqGdnXiH4U5aLuYMCayJ2-gzGzoHsz';
            var APP_KEY = 'LoBkeFnKlG24VBYEfun9BkFh';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },
        // 获取数据
        fetch: function() {
            var query = new AV.Query('Message');
            return query.find() // Promise 对象
        },
        // 创建数据
        save: function(name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({ // Promise 对象
                'name': name,
                'content': content
            })
        }
    }

    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view, model) {
            this.view = view
            this.model = model

            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.init()
            this.loadMessage()
            this.bindEvents()
        },
        loadMessage: function () {
            this.model.fetch().then(
                (messages) => {
                    let array = messages.map((item)=> item.attributes)
                    array.forEach((item)=> {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}: ${item.content}`
                        this.messageList.appendChild(li)
                    })
                }
            )
        },
        bindEvents: function(){
            this.form.addEventListener('submit', function(e){
              e.preventDefault()
              this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name, content).then(function (object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
                console.log(object)
            })
        }
    }

    controller.init(view, model);

    // 创建TestObject 表
    // var TestObject = AV.Object.extend('TestObject');
    // // 在表中创建一行数据
    // var testObject = new TestObject();
    // // 数据内容是 Hello World  保存
    // // 如果保存成功, 则运行alert('')
    // testObject.save({
    //   words: 'Hello World!'
    // }).then(function(object) {
    //   alert('LeanCloud Rocks!');
    // })
}.call()
