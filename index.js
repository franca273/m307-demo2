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
  for (const post of posts.rows) {
    post.datum = post.datum.toLocaleDateString("de-DE");
  }
  res.render("beitraege", { posts: posts.rows, users: users.rows });
});

app.get("/rangliste", async function (req, res) {
  const users = await app.locals.pool.query("select benutzername from users");
  const posts = await app.locals.pool.query(
    "select bild, titel, datum from posts"
  );
  /*
  const linkS = document.getElementById("rc__text--suess");
  const bewertungS = document.getElementById("rangliste__container--suess");
  const linkL = document.getElementById("rc__text--lustig");
  const bewertungL = document.getElementById("rangliste__container--lustig");

  linkS.addEventListener("click", () => {
    bewertungS.style.visibility = "visible";
    bewertungL.style.visibility = "hidden";
  });

  linkL.addEventListener("click", () => {
    bewertungS.style.visibility = "hidden";
    bewertungL.style.visibility = "visible";
  });
*/
  const suess = await app.locals.pool.query(
    "select * from posts order by herzen DESC limit 5"
  );
  const lustig = await app.locals.pool.query(
    "select * from posts order by smileys DESC limit 5"
  );
  for (const postS of suess.rows) {
    postS.datum = postS.datum.toLocaleDateString("de-DE");
  }
  for (const postL of lustig.rows) {
    postL.datum = postL.datum.toLocaleDateString("de-DE");
  }
  res.render("rangliste", {
    posts: posts.rows,
    users: users.rows,
    suess: suess.rows,
    lustig: lustig.rows,
  });
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
