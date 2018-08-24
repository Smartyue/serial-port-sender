/**
 * Created by yuanjianxin on 2018/8/24.
 */
const express=require("express");
const {app} = require('electron')
const cors=require("cors");
const bodyParser = require('body-parser');
const SerialUtil=require("./SerialUtil");
const App=express();
const port=8888;

App.use(bodyParser.urlencoded({extended: true}));
App.use(bodyParser.json({limit: '1mb'}));
App.use(cors());

App.listen(port);

App.get('/getPorts',async (req,res)=>{
    let list=await SerialUtil.getSerialPortList();
    res.send(list);
});


App.post('/send',async (req,res)=>{
    let comName=req.body.comName;
    let content=req.body.content;

    let baudRate=req.body.baudRate || 9600;
    let result=await SerialUtil.sendData(comName,content,baudRate);
    res.send(result);
});


