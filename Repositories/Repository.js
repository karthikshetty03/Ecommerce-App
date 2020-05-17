const fs = require("fs");
const crypto = require("crypto");

module.exports = class Repository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async create(attrs) {
    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
    return attrs;
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }

  async updateOne(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }
    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;
      for (let key in filters) {
        //for in for objects
        if (record[key] !== filters[key]) {
          found = false;
        }

        if (found) {
          return record;
        }
      }
    }
  }

  async delete(id) {
    const records = await this.getAll();

    //  records.find(record => {
    //      if(record.id === id) {

    //        records.pop(record);
    //        //console.log(records);
    //        this.writeAll(records);
    //        return;
    //      }
    //});

    const filteredRecords = records.filter((record) => record.id !== id);
    //delete karne wala record nahi hai toh match nahi karega true retrun karega matlab woh apne filtered records me add hoga
    await this.writeAll(filteredRecords);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }
};
