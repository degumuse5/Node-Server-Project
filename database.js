const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, 'databaseCon/.env') })  

const uri = process.env.MONGO_CONNECTION_STRING;


const databaseAndCollection = {db: process.env.MONGO_DB_NAME, collection:process.env.MONGO_COLLECTION};

const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri);

async function insertToDb(data){
    try {
        await client.connect();
        
        const result = await client.db(databaseAndCollection.db)
        .collection(databaseAndCollection.collection)
        .insertOne(data);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function getFormEmail(email){
    let filter = {email: email};
    try {
        await client.connect();
        
        const result = await client.db(databaseAndCollection.db)
        .collection(databaseAndCollection.collection)
        .findOne(filter);
        return result;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function getGpa(gpa){
    let filter = {gpa : { $gte: gpa}}
    try {
        await client.connect();
        const result = await client.db(databaseAndCollection.db)
        .collection(databaseAndCollection.collection)
        .find(filter);
        return result;
    } catch (e) {
        console.error(e);
    } 
}

async function deleteCol(){
    try {
        await client.connect();
        
        const result = await client.db(databaseAndCollection.db)
        .collection(databaseAndCollection.collection)
        .deleteMany({});
        return result.deletedCount;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = {insertToDb, getFormEmail, getGpa, deleteCol}