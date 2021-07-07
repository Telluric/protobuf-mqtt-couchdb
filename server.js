const pmc = require('./index');
const PouchDB = require('pouchdb');
const mqtt = require('mqtt')

// Setup MQTT Client and Subscribe
const client  = mqtt.connect(process.env.MQTT_BROKER)
const feed = process.env.MQTT_FEED;

client.on('connect', () => {
    client.subscribe(feed)
})

// Load PB and Sync Mutated Messages to Couchdb
pmc({
    file: process.env.PROTOBUF_FILE,
    type: process.env.PROTOBUF_TYPE,
    db: new PouchDB(process.env.COUCHDB_DATABASE),
    client: client,
    mutation: process.env.PMC_MUTATION_FILE ? require(process.env.PMC_MUTATION_FILE) : (d)=>d
}, (res)=>{
    console.log(res);
})
