const grpc =require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const p_path = "./items.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}

const packageDef = protoLoader.loadSync(p_path, options);
const ItemService = grpc.loadPackageDefinition(packageDef).ItemServices;
const client = new ItemService("localhost:4000", grpc.credentials.createInsecure());
console.log(client);
module.exports = client;