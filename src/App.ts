import express from "express";
const query = require('./utils/sqlhelper');

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Hello world");
});


app.listen(port, async () => {
    
    // const test = await query('select * from tbl_test');
    // const test = await query('insert into tbl_test(id, name values(99, N\'đã vào rồi\' ), (99, N\'đã vào rồi 2\' ), (99, N\'đã vào rồi 3\' )');
    // const test = await query('update tbl_test set name= N\'Tui updated đây\' where id=?', [1])
    const test = await query('delete from tbl_test where id=?', [99])

    console.log(test)
    console.log( typeof test)

    // console.log(JSON.stringify(test.error))
    // console.log(JSON.stringify(test));
    // console.log(test[1].name);
});
