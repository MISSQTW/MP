const CONFIG = require('./config'),
	session = require('express-session'),
	qs = require('qs');

/*-CREATE SERVER-*/
const express = require('express'),
	app = express();
app.listen(CONFIG.PORT, () => {
	console.log(`当前服务 起于${CONFIG.PORT}端口`);
});
console.log(__dirname)
app.use(express.static(__dirname + '/json'))