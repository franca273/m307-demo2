import { createApp } from "./config.js";

const app = createApp({
  user: "autumn_star_7622",
  host: "168.119.168.41",
  database: "demo",
  password: "uaioysdfjoysfdf",
  port: 18324,
});

/* Startseite */
app.get("/", async function (req, res) {
  res.render("beitraege", {});
});

app.get("/rangliste", async function (req, res) {
  res.render("rangliste", {});
});

app.get("/neu", async function (req, res) {
  res.render("neu", {});
});

app.get("/profil", async function (req, res) {
  res.render("profil", {});
});

app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

/*Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
