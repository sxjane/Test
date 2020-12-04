const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url='mongodb://admin:123@localhost:27017/?authSource=admin'
const dbName = 'test'

const client= new MongoClient(url,{useUnifiedTopology: true})

client.connect(function(err){
    assert.equal(null,err)
    console.log("Connected successfully to server")
    const db = client.db(dbName)
    // insertDocuments(db, function(result){
    //     console.log('result is', result)
    // })
    findDocuments(db, ()=>{
        console.log("finished finding")
        client.close()
    })
    

})

const insertDocuments = function(db, callback){
    const collection = db.collection('documents');
    collection.insertMany([
        {a:1},{a:2},{a:3}
    ],function(err,result){
        assert.equal(err,null)
        assert.equal(3, result.result.n)
        assert.equal(3, result.ops.length)
        console.log('Inserted 3 documents into the collection')
        callback(result)
    })
}

const findDocuments = (db, callback)=>{
    const collection = db.collection('documents')
    collection.find({'a':1}).toArray((err, docs) =>{
        assert.equal(err,null)
        console.log("Found the following records")
        console.log(docs)
        callback(docs)
    })
}


// const express = require('express')
// const path = require('path')
// const morgan = require('morgan')

// const port = 3000
// const indexFile = path.join(__dirname, '../build/index.html')
// const PUBLIC_DIR = path.join(__dirname, '../build')


// const app = express()
// app.use(morgan('dev'))
// app.use(express.static(PUBLIC_DIR))
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))


// app.get('/', (req, res) => {
//     res.sendFile(indexFile)
// })

// app.post('/test-page', (req, res) =>{
//     var name = req.body.name
//     var color = req.body.color
//     var params = req.params
//     res.send('hello ' + name + ', hello ' + color + '!\n')
//     console.log('test-page:',params)
// })

// app.listen(port, ()=>{
//     console.log(`App listening at http://localhost:${port}`)
// })
