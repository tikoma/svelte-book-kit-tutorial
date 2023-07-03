import { MongoClient } from  'mongodb';
import { env } from '$env/dynamic/private';

export const client = new MongoClient( env.MONGODB_URI ?? 'mongodb://dumy' );
export const database = client.db();



