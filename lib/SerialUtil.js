/**
 * Created by yuanjianxin on 2018/8/24.
 */
const SerialPort=require("serialport");
const SerialPortMap=new Map();
module.exports={


    async getSerialPortList(){
        return new Promise((resolve,reject)=>{
            SerialPort.list((err,res)=>{
                err ? reject(err) : resolve(res);
            });
        })
    },


    async sendData(comName,content,baudRate){

        !SerialPortMap.has(comName) && SerialPortMap.set(comName,new SerialPort(comName,{baudRate, autoOpen:true}));
        let port=SerialPortMap.get(comName);
        return new Promise((resolve)=>{
            let result={};
            port.write(content,function (err) {
                if(err){
                    result={
                        status:false,
                        message:"Send error"
                    };
                    resolve(result);
                }else{
                    result={
                        status:true,
                        message:"Send success"
                    };
                    resolve(result);
                }
            });
        });

        // return new Promise((resolve)=>{
        //     let result={};
        //     let port=new SerialPort(comName,{
        //         baudRate,
        //         autoOpen:false
        //     });
        //     try{
        //
        //         port.open(function (err) {
        //
        //             if(err){
        //                 result={
        //                     status:false,
        //                     message:"Open port error"
        //                 };
        //                 resolve(result);
        //             }else{
        //                 port.write(content,function (err) {
        //                     if(err){
        //                         result={
        //                             status:false,
        //                             message:"Send error"
        //                         };
        //                         resolve(result);
        //                     }else{
        //                         result={
        //                             status:true,
        //                             message:"Send success"
        //                         };
        //                         resolve(result);
        //                     }
        //                 });
        //             }
        //
        //         })
        //     }catch (e){
        //         result={
        //             status:false,
        //             message:"Unknown error"
        //         };
        //         resolve(result);
        //     }finally {
        //         port.close();
        //     }
        // });

    },


};

