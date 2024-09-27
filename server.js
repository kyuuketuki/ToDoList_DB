// インポート
const express = require("express");
const {Client} = require("pg");

// ポート番号を設定
const portNumber = 80;

// appオブジェクトを作成する
const app = express();

// // インスタンスの作成
// const client = new Client({
//     user: "postgres",
//     host: "localhost",
//     database: "todolist",
//     password: "tetraDev2024",
//     port: "5432"
// });

/*
JSON返信
app.get("/", (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' });
    // res.status(200).send({ id: 1, message: "DBサーバーからのメッセージ" });
    res.status(200).send(ViewTable());
});

// リクエストを待ち受ける
app.listen(portNumber);

console.log(`PortNumber is ${portNumber}`);
*/

// main();
// async function main(){
    // console.log(await ViewTable());
    // // tasks = await ViewTable();

    // // JSON返信
    // app.get("/", async(req, res) => {
    // res.set({ 'Access-Control-Allow-Origin': '*' });
    // res.status(200).send(await ViewTable());
    // });

    // // リクエストを待ち受ける
    // app.listen(portNumber);

    // console.log(`PortNumber is ${portNumber}`);
// }

// console.log(await ViewTable());

// JSON返信
app.get("/", async(req, res) => {
res.set({ 'Access-Control-Allow-Origin': '*' });
res.status(200).send(await ViewTable());
});

// リクエストを待ち受ける
app.listen(portNumber);

console.log(`PortNumber is ${portNumber}`);

// 関数
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

    /*
    let result;
    client.query(query)
    .then((res) =>{
        result = res.rows;
        client.end();
        return result;
    })
    .catch((err) => {
        console.error(err.stack);
        client.end();
    });
    */

    const res = await client.query(query);
    result = res.rows;
    await client.end();
    return result;
}