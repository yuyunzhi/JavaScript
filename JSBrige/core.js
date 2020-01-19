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


// 从原生接口中拿到用户是否登录的状态，来更新vuex
bridge.callHandler('getUserInfo', { 'param': 123 }, (responseData) => {
    console.log('getUserInfo', responseData)
    const { isLogin, userInfo } = JSON.parse(responseData)
    console.log('isLogin', isLogin, JSON.parse(userInfo))
    if (isLogin) {
        this.$store.commit('userLogIn', JSON.parse(userInfo))
        this.$router.push('/terminal/rank')
    }
})

// showPage更新包原生控制loading隐藏
bridge.callHandler('showPage', { 'param': 123 }, (responseData) => {
    console.log('showPage事件', responseData)
})

// 监听401
bridge.registerHandler('XHBHandleError', data => {
    const code = JSON.parse(data).code
    console.log('原生回调的方法结果111111', data, code)
    if (code === 401) {
        console.log('进来了了吗')
        this.$store.commit('userLogOut')
        this.$router.push('/')
    }
})

// 持续监听NFC事件
bridge.registerHandler('XHBAPPDeviceInfo', data => {
    console.log('原生回调的方法结果', data)
    if (this.$store.state.isLogin) {
        this.goToStudentInformationPage(data)
    } else {
        this.goToLoginPage()
    }
})

export default new CoreBrige()
