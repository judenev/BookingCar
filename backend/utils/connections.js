const MongoClient=require('mongodb').MongoClient
const state={
    db:null
}
module.exports.connect =function(finished){
    const url ='mongodb://localhost:27017'
    const dbname='Car'
    
    MongoClient.connect(url,(err,data)=>{
        if (err) return finished(err)
        state.db=data.db(dbname)
   
        finished()
    })

    
}
module.exports.get=function(){
    return state.db
}
