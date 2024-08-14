import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    const uri = process.env.URI;
    console.log(`Connecting to MongoDB at ${uri}`); // Log bağlantı URI'si
    return {
      uri
    };
  }
}