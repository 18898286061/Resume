var fs = require('fs')
var dirname = process.argv[2]
var path = "./" + dirname
if(fs.existsSync(path))
{
    console.log('existence address')
    process.exit(1)
}
else{
fs.mkdirSync("./" + dirname)
process.chdir("./" + dirname)
fs.mkdirSync('css')
fs.mkdirSync('js')
fs.writeFileSync("./index.html"," <!DOCTYPE>\n<title>Hello</title>\n<h1>Hi</h1>")
fs.writeFileSync("./css/style.css","h1{color: red;}")
fs.writeFileSync("./js/main.js",'var string = "Hello World"\nalert(string)')
process.exit(0)
}