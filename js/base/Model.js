window.Model = function(options) {
    let resourceName = options.resourceName
    // console.log(options)
    // console.log(resourceName)
    
    return {
        init: function() {
            var APP_ID = 'dV0a9YjtfgEXpL1rYBbCKcti-gzGzoHsz'
            var APP_KEY = 'q6Qtyp5m7PPtTwEwNmj6D28A'

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch: function() {
            var query = new AV.Query(resourceName)
            //返回Promise对象
            return query.find()
        },
        save: function(object) {
            var X = AV.Object.extend(resourceName)
            var x = new X()
            //返回Promise对象
            return x.save(object)
        }
    }
}