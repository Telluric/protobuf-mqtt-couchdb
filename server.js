const pmc = require('./index');
const PouchDB = require('pouchdb');
const mqtt = require('mqtt')

// Setup MQTT Client and Subscribe
const client  = mqtt.connect(process.env.MQTT_BROKER)
const feed = process.env.MQTT_FEED;

client.on('connect', () => {
    client.subscribe(feed).catch(err=>throw err)
})

// Load PB and Sync Mutated Messages to Couchdb
pmc({
    file: process.env.PROTOBUF_FILE,
    type: process.env.PROTOBUF_TYPE,
    db: new PouchDB(process.env.COUCHDB_DATABASE),
    client: client,
    mutation: (d) => {
        let timestamp = Date.now()
        d.tsdiff = timestamp - d.timestamp
        d.timestamp = timestamp
        return {...d, _id:`${timestamp}`}
    }
}, (res)=>{
    console.log(res);
})
