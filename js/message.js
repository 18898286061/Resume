var APP_ID = 'z1CIqGdnXiH4U5aLuYMCayJ2-gzGzoHsz';
var APP_KEY = 'LoBkeFnKlG24VBYEfun9BkFh';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
// console.log("Ok");

var query = new AV.Query('Message');
query.find()
    .then(function (messages) {
    // 成功获得实例
    console.log(messages)
    console.log(messages[0].attributes)
    console.log(messages[1].attributes)
    let array = messages.map((item)=> item.attributes)
    array.forEach((item) => {
        let li = document.createElement('li')
        li.innerText = `${item.name}: ${item.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        })
  // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
    }, 
    function (error) {
    // 异常处理
    console.log(error);
    alert('提交失败，请过A Moment再留言')
    })
    .then(() => {},(error)=> {
        console.log(error)
    });

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let content = myForm.querySelector('input[name=content]').value
    let name = myForm.querySelector('input[name=name]').value
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        'name': name,
        'content': content
    }).then(function(object) {
        // 成功之后自动刷新页面
        // window.location.reload();
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        console.log(object)
    })
})

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