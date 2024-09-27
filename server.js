// インポート
const express = require("express");
const {Client} = require("pg");

// ポート番号を設定
const portNumber = 80;

// appオブジェクトを作成する
const app = express();

// Getリクエスト
app.get("/", async(req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.status(200).send(await ViewTable());
});

// Postリクエスト
app.post("/:task", async(req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.status(200).send(await RegisterTask(req.params.task));
});

// リクエストを待ち受ける
app.listen(portNumber);

console.log(`PortNumber is ${portNumber}`);

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
        text: "INSERT INTO tasklist (task) VALUES ($1)",
        values: [task],
    };

    await client.query(query);
    result = "タスクが追加されました";
    await client.end();
    return result;
}