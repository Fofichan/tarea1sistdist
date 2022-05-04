const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const pathProto = "./items.proto";

const {Client} = require('pg');

const client = new Client({
    host: "postgres",
    user:"postgres",
    port: 5432,
    database:"tiendita"
})



client.connect()
.then(() => console.log('conectado!'))
//.then(() => client.query("select * from Items"))
//.then(results => console.table(results.rows))
//.catch(err => console.error(err))
//.finally(()=> client.end())

//const items = client.query('SELECT * FROM Items').then((e) => console.log(e));

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}

const packageDef = protoLoader.loadSync(pathProto, options);
const itemProto = grpc.loadPackageDefinition(packageDef);

const server = () => {
    const server = new gprc.Server();
    console.log(itemProto)
    server.addService(itemProto.ItemService.service, {
        getItem: async (req, callback) => {
            console.log(req)
            const itemName = req.request.name;
            if(itemName){   
                query = await client.query(`SELECT * from Items WHERE Name ILIKE '%${itemName}%'`)
            }
            else{
                query = await client.query("SELECT * from Items")
            }

            callback(null, {items:query.rows});

        }
    });
    server.bindAsync("localhost:4000", grpc.ServerCredentials.createInsecure(), (err, response) =>{
        if(err != null){
            console.log(err);
        }
        else{
            console.log("Running at localhost:4000");
            server.start();
        }
    });
};

exports.server = server;