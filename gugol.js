pesq = require("./lib/pesq")

path = require("path")
express = require("express")
http = require("http")
socket = require("socket.io")
sys = require("toolsys")

app = express()
ip = sys.myIp
//console.log(sys)
port = process.env.PORT || 3001
server = http.createServer(app)
io = socket(server)
pathGugolplex = path
.join(__dirname+"/gugolplex")

console.log(pathGugolplex)


//console.log(os)
/*app.get('/app', function(req, res){
	console
	.dir(Object.values(req.headers)[4])
	res.sendFile(pathGugolplex)
	})
*/



app.use(express.static(pathGugolplex))

io.on("connection", (socket) => {
	console.log(" um novo usuario foi conectado")
	
	socket.on("disconnect", () => {
	console.log("usuario foi desconectado")
})
})

//gets
	
app.get('/pesq/:pes', function(req, res){
	pesq.pesqImage(req.params.pes)
	.then((r) => {
		console.log(r)
		res.json({results: r})
		})
	})
	
	
app.get('/pes/:pes', function(req, res){
	pesq.pesqTotal(req.params.pes)
	.then((r) => {
		console.log(r)
		res.json({results: r})
		})
	})


server.listen(port, function(){
	console.log(`online em http://${ip}:${port}`)
	})
	

