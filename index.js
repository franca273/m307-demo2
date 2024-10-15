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
  const users = await app.locals.pool.query("select benutzername from users");
  const posts = await app.locals.pool.query(
    "select bild, titel, datum from posts"
  );
  res.render("beitraege", { posts: posts.rows, users: users.rows });
});

app.get("/rangliste", async function (req, res) {
  const users = await app.locals.pool.query("select benutzername from users");
  const posts = await app.locals.pool.query(
    "select bild, titel, datum from posts"
  );
  res.render("rangliste", { posts: posts.rows, users: users.rows });
});

app.get("/neu", async function (req, res) {
  const users = await app.locals.pool.query("select benutzername from users");
  const posts = await app.locals.pool.query("select * from posts");
  res.render("neu", { posts: posts.rows, users: users.rows });
});

app.get("/profil", async function (req, res) {
  const users = await app.locals.pool.query("select * from users");
  res.render("profil", { users: users.rows });
});

/*Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
