const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const User = require("../Models/User");

exports.create = async (req, res) => {
  console.log(req.file);
  const totalRecords = [];
try{
console.log(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
  fs.createReadStream(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => totalRecords.push(row))
    .on('end', async rowCount => {
      try{
        const users = await User.insertMany(totalRecords);
        
        res.json(users);
      }catch(err){
        res.status(400).json(err);
      }
    });

  }catch(error){
    res.status(400).json(error)
  }
};
