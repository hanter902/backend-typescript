import express from "express";
const query = require('./utils/sqlhelper');

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Hello world");
});


app.listen(port, async () => { 
    console.log(process.env.NODE_ENV)


    const test = await query('select * from tbl_test');
    // const test = await query('insert into tbl_test(id, name values(99, N\'đã vào rồi\' ), (99, N\'đã vào rồi 2\' ), (99, N\'đã vào rồi 3\' )');
    // const test = await query('update tbl_test set name= N\'Tui updated đây\' where id=?', [1])
    // const test = await query('delete from tbl_test where id=?', [99])

    // const test = await query('select * from vendors');
    // const test = await query(`insert into vendors(id, name, address, status, updatedAt) values('vendorid_1','vendorName_1', 'vendorAddress_1', 1, now());`);

    console.log(test)

});
