# 🏠 @telluric/protobuf-mqtt-couchdb [WIP]

System used to synchronize MQTT Protobuff Messages to Couchdb.

# 🔨 Installing:
```bash
npm install -s Telluric/protobuf-mqtt-couchdb
```

# ⚙️ Usage:
```javascript
const pmc = require('@telluric/protobuf-mqtt-couchdb');
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
```

# ✏️ Environment Variables
Setting these will configure the middleware services. They are all
required to run the server.js example. You can configure them in an
.env file in the root of your project

| ENV Variable | Example Value |
|---|---|
| COUCHDB_DATABASE | http://localhost:5984/messages |
| MQTT_BROKER | mqtt://localhost |
| MQTT_FEED | /feed/messages |
| PROTOBUF_FILE | example.proto |
| PROTOBUF_TYPE | example.Message |

# 📝 License

MIT License - See ./LICENSE
