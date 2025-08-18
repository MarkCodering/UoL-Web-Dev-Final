const path = require("path");
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Load JSON
const dataPath = path.join(__dirname, "data", "history.json");
const HISTORY = JSON.parse(fs.readFileSync(dataPath, "utf8"));

// EJS setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static (for optional client assets later)
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

// Pages (EJS renders JSON)
// server.js
app.get("/", (req, res) => {
  res.render("home", {
    title: `${HISTORY.site.title} — Home`,
    site: HISTORY.site,
    stages: HISTORY.stages   // <-- add this
  });
});

app.get("/history", (req, res) => {
  res.render("history", {
    title: `${HISTORY.site.title} — History`,
    site: HISTORY.site,
    stages: HISTORY.stages,
    milestones: HISTORY.milestones
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: `${HISTORY.site.title} — Contact`, site: HISTORY.site });
});

// JSON APIs (nice for testing / marking)
app.get("/api/stages", (req, res) => res.json({ stages: HISTORY.stages }));
app.get("/api/milestones", (req, res) => res.json({ milestones: HISTORY.milestones }));
app.get("/api/all", (req, res) => res.json(HISTORY));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
