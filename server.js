// expressをrequireする
const express = require("express");

// ポート番号を設定
const portNumber = 80;

// appオブジェクトを作成する
const app = express();

// インスタンスの作成
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "todolist",
    password: "tetraDev2024",
    port: "5432"
});


// JSON返信
app.get("/", (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' });
    // res.status(200).send({ id: 1, message: "DBサーバーからのメッセージ" });
    res.status(200).send(ViewTable());
});

// リクエストを待ち受ける
app.listen(portNumber);

console.log(`PortNumber is ${portNumber}`);

function ViewTable(){
    client.connect();

    const query = "SELECT id, task, to_char(deadline,'YYYY年MM月DD日HH時MI分SS秒') AS deadline FROM tasks ORDER BY id";
    const result = client.query(query)
    .then((res) =>{
        return res.rows;
    })
    .catch((err) => {
        console.error(err.stack);
    });
    client.end();
    return result;
}