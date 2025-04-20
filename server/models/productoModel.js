import { ObjectId } from 'mongodb';
import dbClient from '../config/dbClient.js';
class productoModel{
    async update(id, producto){
        const colProducto = dbClient.db.collection('productos');
        return await colProducto.updateOne({ _id: new ObjectId(id) }, { $set: producto });  
    }
    async delete(id){
        const colProducto = dbClient.db.collection('productos');
        return await colProducto.deleteOne({ _id: new ObjectId(id) });  
    }

    async create(producto){
        const colProducto = dbClient.db.collection('productos');
        return await colProducto.insertOne(producto);  
    }
    async getAll(){
        const colProducto = dbClient.db.collection('productos');
        return await colProducto.find({}).toArray();  

    }
    async getOne(id){
        const colProducto = dbClient.db.collection('productos');
        return await colProducto.findOne({ _id: new ObjectId(id) });    
    }
    
}
export default new productoModel; 