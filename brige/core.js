class CoreBrige {
    constructor(){
        //
        this.isDevelopment = process.env.VUE_ISWEB === 'true'
        this.storageKey = process.env.VUE_STORAGE_KEY
        this.bridge = window['WebViewJavascriptBridge']
        console.log('bridge', this.bridge)
    }
    // 主动调用
    callHandler(moduleName,params){
        return new Promise ((resolve,reject )=>{
            // 开发环境
            if(this.isDevelopment){
                // 走PC端的axios接口
                return
            }
            // 原生环境
            this.bridge.callHandler(moduleName, params, (responseData) => {
                reslove(responseData)
            })
        })
    }
    //持续监听注册
    registerHandler(moduleName,callback){
            // 开发环境
            if(this.isDevelopment){
                // 走PC端模拟
                return
            }

            this.bridge.registerHandler(moduleName,(responseData)=>{
                try{
                    const res = JSON.stringify(responseData)
                    callback(responseData)
                }catch{
                    callback('JSON 无法解析')

                }
            })

    }

}

export default new CoreBrige()
