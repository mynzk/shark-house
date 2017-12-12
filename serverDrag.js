const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const webpack = require("webpack");
const config = require('./webpack.config.drag');
const devMiddleware = require("./devMiddleware");
const hotMiddleware = require('./hotMiddleware');
const Router = require('koa-router');
const router = new Router();
const app = new Koa();
const static = require('koa-static');
const server =require('http').createServer(app.callback());
const io = require('socket.io')(server);
const staticPath = '/';

const compiler = webpack(config);

app.use(router.routes());

app.use(static(
  path.join( __dirname,  staticPath)
))

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(hotMiddleware(compiler));


router.get('/', (ctx, next) => {
	 // let htmlFile = await (new Promise(function(resolve, reject){
	 //      fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
	 //        if (err){
	 //          reject(err);
	 //        }else{
	 //          resolve(data);
	 //        }
	 //      });
	 //  }))
	  ctx.type = 'html';
	  ctx.body = fs.createReadStream(path.join(__dirname, 'index.html'));
});





// 在线用户
let onlineUsers = {};
// 在线用户人数
let onlineCount = 0;

io.on('connection', function(socket) {
    // 监听客户端的登陆
    socket.on('login', function(obj){

        // 用户id设为socketid
        socket.id = obj.uid;

        // 如果没有这个用户，那么在线人数+1，将其添加进在线用户
        if (!onlineUsers.hasOwnProperty(obj.uid)) {
            onlineUsers[obj.uid] = obj.username;
            onlineCount++;
        }

        // 向客户端发送登陆事件，同时发送在线用户、在线人数以及登陆用户
        io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
        console.log(obj.username+'加入了群聊');
    })

    // 监听客户端的断开连接
    socket.on('disconnect', function() {

        // 如果有这个用户
        if(onlineUsers.hasOwnProperty(socket.id)) {
            let obj = {uid:socket.id, username:onlineUsers[socket.id]};

            // 删掉这个用户，在线人数-1
            delete onlineUsers[socket.id];
            onlineCount--;

            // 向客户端发送登出事件，同时发送在线用户、在线人数以及登出用户
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
            console.log(obj.username+'退出了群聊');
        }
    })

    // 监听客户端发送的信息
    socket.on('message', function(obj){
        io.emit('message', obj);
        console.log(obj.username+"说:"+ obj.message)
    })

})




server.listen(8300, function(err) {
    console.log('Listening at *:8300');
});