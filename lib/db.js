// lib/db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

export async function openDb() {
  if (!db) {
    db = await open({
      filename: "./mydb.sqlite",
      driver: sqlite3.Database,
    });
  }
  return db;
}

export async function getImages() {
  const db = await openDb();
  return db.all("SELECT * FROM images");
}
