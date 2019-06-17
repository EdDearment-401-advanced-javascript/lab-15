'use strict';

const uuid = require('uuid/v4');

class Model {
  constructor(schema){
    this.schema = schema;
    this.db = []
  }

  sanitize(entry){
    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach(field => {
      if(this.schema[field].required) {
        if(entry[field]){
          record[field] = entry[field];
        }
        else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });
    return valid ? record : undefined;
  }
  count() {
    return this.db.length;
  }

  get(id){
    const records = id ? this.db.filter( (record) => record._id === id) : this.db;
    return Promise.resolve(records);
  }

  post(entry) {
    entry._id = uuid();
    let record = this.sanitize(entry);
    if (record._id) {this.db.push(record);}
    return Promise.resolve(record);
  }
  delete(id) {
    this.db = this.db.filter((record) => record._id !== id);
    return this.get(id);
  }
  put(id, entry){
    let record = this.sanitize(entry);
    if(record._id) {this.db = this.db.map((item) => (item._id) ? record : time);}
    return this.get(id);
  }
}
module.exports = Model;
