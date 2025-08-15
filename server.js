const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const DB_PATH = path.join(__dirname, "app.db.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function readDB() {
  try { return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")); }
  catch { return { notes: [], nextId: 1 }; }
}
function writeDB(db) { fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2)); }

app.get("/api/notes", (_req, res) => {
  const db = readDB();
  res.json([...db.notes].sort((a,b)=>b.id - a.id));
});

app.post("/api/notes", (req, res) => {
  const text = (req.body?.text || "").trim();
  if (!text) return res.status(400).json({ error: "text required" });
  const db = readDB();
  const note = { id: db.nextId++, text, created_at: new Date().toISOString() };
  db.notes.push(note);
  writeDB(db);
  res.status(201).json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();
  const before = db.notes.length;
  db.notes = db.notes.filter(n => n.id !== id);
  writeDB(db);
  res.json({ deleted: before - db.notes.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
