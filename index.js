import { createApp } from "./config.js";

const app = createApp({
  user: "snowy_night_6881",
  host: "bbz.cloud",
  database: "snowy_night_6881",
  password: "9cb621f061b3a4602a99d63fbe6b9691",
  port: 30211,
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
