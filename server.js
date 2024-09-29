// インポート
const express = require("express");
const {Client} = require("pg");

// ポート番号を設定
const portNumber = 80;

// appオブジェクトを作成する
const app = express();

const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://13.231.30.42:3000");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
    next();
};

app.use(cors);
app.use(express.json());

// リクエスト待機
app.listen(portNumber);

console.log(`PortNumber is ${portNumber}`);

// ----------------------------------------
// リクエスト
// ----------------------------------------
// Getリクエスト
app.get("/", async(req, res) => {
    res.status(200).send(await ViewTable());
});

// Postリクエスト
app.post("/", async(req, res) => {
    res.status(200).send(await RegisterTask(req.body.task));
});

// ----------------------------------------
// データベース操作
// ----------------------------------------
// テーブル表示
async function ViewTable(){
    // インスタンスの作成
    const client = new Client({
        user: "postgres",
        host: "localhost",
        database: "todolist",
        password: "tetraDev2024",
        port: "5432"
    });

    client.connect();

    const query = "SELECT id, task, to_char(deadline,'YYYY年MM月DD日HH時MI分SS秒') AS deadline FROM tasks ORDER BY id";

    const res = await client.query(query);
    result = res.rows;
    await client.end();
    return result;
}

// レコード追加
async function RegisterTask(task){
    // インスタンスの作成
    const client = new Client({
        user: "postgres",
        host: "localhost",
        database: "todolist",
        password: "tetraDev2024",
        port: "5432"
    });

    client.connect();

    const query = {
        text: "INSERT INTO tasks (task) VALUES ($1)",
        values: [task],
    };

    await client.query(query);
    result = "タスクが追加されました";
    await client.end();
    return result;
}