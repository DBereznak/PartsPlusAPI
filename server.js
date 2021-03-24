var express = require("express");
var bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");
var app = express();
var port = process.env.PORT || 443;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://74.208.93.158:443/parts");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function (req, res) {
  res.send("Parts Plus is live");
});

// get all parts
app.get("/parts", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://74.208.93.158:443/parts");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const db = new sqlite3.Database("./db/parts.db", (error) => {
    if (error) {
      console.error("Error opening Database " + error.message);
    }
    db.all("SELECT * FROM parts", [], (error, rows) => {
      if (error) {
        return error.message;
      }
      res.send(rows);
    });
  });

  db.close();
});

// get part by id
app.get("/parts/:id", (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://74.208.93.158:443/parts/:id"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const id = [req.params.id];
  const db = new sqlite3.Database("./db/parts.db", (error) => {
    if (error) {
      console.error("Error opening Database " + error.message);
    }
    db.get(`SELECT * FROM parts where part_number = ?`, id, (error, row) => {
      if (error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.json(row);
    });
  });

  db.close();
});

// add new part
app.post("/parts/new/", (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://74.208.93.158:443/parts/new"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const sql =
    "INSERT INTO parts (part_number, part_name, part_description, quantity, unit_price, sell_price, image_url) VALUES (?,?,?,?,?,?,?)";
  const data = {
    part_number: req.body.part_number,
    part_name: req.body.part_name,
    part_description: req.body.part_description,
    quantity: req.body.quantity,
    unit_price: req.body.unit_price,
    sell_price: req.body.sell_price,
    image_url: req.body.image_url,
  };
  params = [
    data.part_number,
    data.part_name,
    data.part_description,
    data.quantity,
    data.unit_price,
    data.sell_price,
    data.image_url,
  ];
  const db = new sqlite3.Database("./db/parts.db", (error) => {
    if (error) {
      console.error("Error opening Database " + error.message);
    }
    db.run(sql, params, (error, result) => {
      if (error) {
        res.status(400).json({ "error:": error.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        id: this.lastID,
      });
    });
  });
  db.close();
});

// update parts
app.patch("/parts/update/:id", (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://74.208.93.158:443/parts/update/:id"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const sql =
    "UPDATE parts SET part_name = ?, part_description = ?, quantity = ?, unit_price = ?, sell_price =?, image_url = ? WHERE part_number = ?";
  const data = {
    part_number: req.params.id,
    part_name: req.body.part_name,
    part_description: req.body.part_description,
    quantity: req.body.quantity,
    unit_price: req.body.unit_price,
    sell_price: req.body.sell_price,
    image_url: req.body.image_url,
  };
  params = [
    data.part_name,
    data.part_description,
    data.quantity,
    data.unit_price,
    data.sell_price,
    data.image_url,
    data.part_number,
  ];
  const db = new sqlite3.Database("./db/parts.db", (error) => {
    if (error) {
      console.error("Error opening Database " + error.message);
    }
    db.run(sql, params, (error, row) => {
      if (error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.json({ message: "success" });
    });
  });
});

// delete part by id
app.delete("/parts/delete/:id", (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://74.208.93.158:443/parts/delete/:id"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const id = req.params.id;
  const db = new sqlite3.Database("./db/parts.db", (error) => {
    if (error) {
      console.error("Error opening Database " + error.message);
    }
    db.run(`DELETE FROM parts WHERE part_number = ?`, id, (error, row) => {
      if (error) {
        res.status(400).json({ error: error.message });
        return;
      }
    });
  });

  db.close();
});

app.listen(port);
console.log(`listening on port ${port}`);
