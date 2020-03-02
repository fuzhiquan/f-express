const url = require('url')

function Router() {
    this.stack = []
}
Router.prototype.get = function(path, handler) {
    this.stack.push({
        path,
        method: 'get',
        handler
    })
}
Router.prototype.handlerRquest = function(req, res, out) {
    const {pathname} = url.parse(req.url)
    const methodReq = req.method.toLowerCase()
    /**
     * 递归匹配路由规则，如果path和method都匹配调用回调函数handler，如果不匹配递归下一个规则
     */
    let idx = 0
    const next = () => {
        if(idx === this.stack.length) return out() 
        const layer = this.stack[idx++]
        const {path, method, handler} = layer
        if(path === pathname && method === methodReq) {
            handler(req, res, next)
        }else {
            next()
        }
    }
    next()
}

module.exports = Router