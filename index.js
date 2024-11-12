import { createApp, upload } from "./config.js";

const app = createApp({
  user: "snowy_night_6881",
  host: "bbz.cloud",
  database: "snowy_night_6881",
  password: "9cb621f061b3a4602a99d63fbe6b9691",
  port: 30211,
});

/* Startseite */
app.get("/", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }
  const users = await app.locals.pool.query("select benutzername from users");
  const posts = await app.locals.pool.query(
    "select * from posts ORDER BY datum DESC"
  );
  for (const post of posts.rows) {
    if (post.datum) {
      post.datum = post.datum.toLocaleDateString("de-DE");
    }
  }
  res.render("beitraege", { posts: posts.rows, users: users.rows });
});

app.get("/rangliste", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }
  const users = await app.locals.pool.query("select benutzername from users");
  const posts = await app.locals.pool.query(
    "select bild, titel, datum from posts"
  );
  const suess = await app.locals.pool.query(
    "select * from posts order by herzen DESC limit 5"
  );
  const lustig = await app.locals.pool.query(
    "select * from posts order by smileys DESC limit 5"
  );
  for (const postS of suess.rows) {
    if (postS.datum) {
      postS.datum = postS.datum.toLocaleDateString("de-DE");
    }
  }
  for (const postL of lustig.rows) {
    if (postL.datum) {
      postL.datum = postL.datum.toLocaleDateString("de-DE");
    }
  }
  res.render("rangliste", {
    posts: posts.rows,
    users: users.rows,
    suess: suess.rows,
    lustig: lustig.rows,
  });
});

app.get("/neu", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }
  const users = await app.locals.pool.query("select * from users");
  const posts = await app.locals.pool.query("select * from posts");
  res.render("neu", { posts: posts.rows, users: users.rows });
});

app.get("/profil", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }
  const users = await app.locals.pool.query("select * from users");
  res.render("profil", { users: users.rows });
});

/* ------------------------ Daten in Datenbank abfüllen -----------------------*/
app.post("/create_post", upload.single("bild"), async function (req, res) {
  await app.locals.pool.query(
    "INSERT INTO posts (titel, bild, herzen, smileys, user_id, datum) VALUES ($1, $2, 0, 0, $3, CURRENT_TIMESTAMP)",
    [req.body.titel, req.file.filename, req.session.userid]
  );
  res.redirect("/");
});

app.post("/new_profil", async function (req, res) {
  await app.locals.pool.query(
    "UPDATE users SET benutzername = $1, passwort = $2 WHERE id = $3",
    [req.body.benutzername, req.body.passwort, req.session.userid]
  );
  res.redirect("/");
});

app.post("/like", async function (req, res) {
  await app.locals.pool.query(
    "UPDATE posts SET herzen = herzen + 1 WHERE id = $1",
    [req.body.id]
  );
  res.redirect(`/#post-${req.body.id}`);
});

app.post("/smile", async function (req, res) {
  await app.locals.pool.query(
    "UPDATE posts SET smileys = smileys + 1 WHERE id = $1",
    [req.body.id]
  );
  res.redirect(`/#post-${req.body.id}`);
});

/*Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
