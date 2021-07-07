require('dotenv').config();
const protobuf = require('protobufjs');

/**
 * ProtoBuff MQTT CouchDB
 * Load a protobuf file and message type to be used in decoding
 * MQTT Messages that will be stored in CouchDB
 *
 * @param file
 * @param type
 * @param db
 * @param client
 * @param mutation
 * @param callback
 */
module.exports = function pmc({file, type, db, client, mutation = (d) => d}, callback) {
    protobuf.load(file, (err, root) => {
        if(err) throw err;
        client.on('message',
            async (topic, message) => callback( await db.post(mutation(root.lookupType(type).decode(message))))
        )
    })
}
