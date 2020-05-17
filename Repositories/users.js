const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const scrypt = util.promisify(crypto.scrypt);
const Repository = require('./Repository');


class UsersRepository extends Repository {
  
  async create(attrs) {
    attrs.id = this.randomId();
    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(attrs.pass, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      pass: `${buf.toString("hex")}.${salt}`,
    };
    records.push(record);

    await this.writeAll(records);
    return record;
  }

  async comparePasswords(saved, supplied) {
    const [hashed, salt] = saved.split("."); //array destructuring

    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

    return hashed === hashedSuppliedBuf.toString("hex");
  }


}

module.exports = new UsersRepository("users.json");

//const test = async () => {
//  const repo = new UsersRepository("users.json");

//  //  await repo.delete("78502832");
////  await repo.create( {
////    email: "ALL RIGHTS RESERVED",
////    pass: "StephenGriderisNoLess",
////  });

////const user = await repo.getOneBy({
////  pass: "dwefvd",
////});
////console.log(user);

//};

//test();
