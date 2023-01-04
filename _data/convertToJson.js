var csv2json = require("csv2json");
var fs = require("fs");

fs.createReadStream("./_data/data.csv")
  .pipe(
    csv2json({
      // Defaults to comma.
      dynamicTyping: Number,
      separator: "|",
    })
  )
  .pipe(fs.createWriteStream("./_data/data.json"));
