const fs = require("fs");
module.exports = ({ key, value }) => {
  const data = JSON.parse(fs.readFileSync("./secrets.json"));
  data[key] = value;
  fs.writeFileSync("secrets.json", JSON.stringify(data, null, 4));

  const data1 = JSON.parse(fs.readFileSync("./secrets_Helper.json"));
  data1[key] = "";
  fs.writeFileSync("secrets_Helper.json", JSON.stringify(data1, null, 4));
};
