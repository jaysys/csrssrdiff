const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// 데이터베이스 연결
const db = new sqlite3.Database("./mydb.sqlite", (err) => {
  if (err) {
    console.error("Error opening database", err);
    return;
  }
  console.log("Database connected");
});

// 이미지를 Base64로 인코딩하는 함수
function encodeImage(filePath) {
  const bitmap = fs.readFileSync(filePath);
  return Buffer.from(bitmap).toString("base64");
}

// 테이블 생성
db.run(
  `CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  data TEXT NOT NULL
)`,
  (err) => {
    if (err) {
      console.error("Error creating table", err);
      return;
    }
    console.log("Table created or already exists");

    // 이미지 파일 경로
    const imagePaths = ["./a.jpg", "./b.jpg"];

    // 각 이미지를 데이터베이스에 삽입
    imagePaths.forEach((imagePath) => {
      const name = path.basename(imagePath);
      const data = encodeImage(imagePath);

      db.run(
        `INSERT INTO images (name, data) VALUES (?, ?)`,
        [name, data],
        function (err) {
          if (err) {
            console.error("Error inserting image", err);
            return;
          }
          console.log(`Image ${name} inserted with ID: ${this.lastID}`);
        }
      );
    });

    // 삽입된 데이터 확인
    db.all(`SELECT id, name FROM images`, [], (err, rows) => {
      if (err) {
        console.error("Error querying images", err);
        return;
      }
      console.log("Inserted images:");
      rows.forEach((row) => {
        console.log(`${row.id}: ${row.name}`);
      });

      // 데이터베이스 연결 종료
      db.close((err) => {
        if (err) {
          console.error("Error closing database", err);
          return;
        }
        console.log("Database connection closed");
      });
    });
  }
);
