import e from "express";
import { MongoClient } from "mongodb";
class dbClient {
  constructor() {
    const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority&appName=ecommerce`;
    this.client = new MongoClient(queryString);
    this.conectarDB();
  }

  async conectarDB() {
    try {
      await this.client.connect();
      this.db = this.client.db('ecommerce');
      console.log("Conectado a la base de datos");
    } catch (error) {
      console.log(error);
    }
  }
}
export default new dbClient; 