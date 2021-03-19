const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./parts.db");
const createParts = `
CREATE TABLE parts(
  part_number NVARCHAR(32) PRIMARY KEY NOT NULL,
  part_name NVARCHAR(32),
  part_description TEXT,
  quantity INTERGER NOT NULL,
  unit_price DOUBLE NOT NULL,
  sell_price DOUBLE NOT NULL,
  image_url TEXT  
)`;

db.serialize(function () {
  db.run(createParts);
  let insert =
    "INSERT INTO parts (part_number, part_name, part_description, quantity, unit_price, sell_price, image_url) VALUES (?,?,?,?,?,?,?)";
  db.run(insert, [
    "1000P905",
    "Pen",
    "A Ink Pen for writing",
    10,
    2.0,
    4.99,
    "https://images-na.ssl-images-amazon.com/images/I/711F6-eLS6L._AC_SL1500_.jpg",
  ]);
});

// const db = new sqlite3.Database("./parts.db", (error) => {
//   if (error) {
//     console.log("Error opening Database" + error.message);
//   } else {
//     db.run(createParts, (error) => {
//       if (error) {
//         console.log("Table already created");
//       }
//       let insert =
//         "INSERT INTO parts (part_number, part_name, part_description, quantity, unit_price, sell_price, image_url) VALUES (?,?,?,?,?,?,?)";
//       db.run(insert, [
//         "1000P905",
//         "Pen",
//         "A Ink Pen for writing",
//         10,
//         2.0,
//         4.99,
//         "https://images-na.ssl-images-amazon.com/images/I/711F6-eLS6L._AC_SL1500_.jpg",
//       ]);
//     });
//   }
// });
