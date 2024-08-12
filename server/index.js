const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnect = require('./dbConnect');
const soundModel = require('./soundModel');

const app = express();
app.use(cors());
app.use(bodyParser.json());

dbConnect();

let setvalue = "medium";


app.get('/', (req, res) => {

});

app.get('/getdata', (req, res) => {
    res.send(setvalue);
});

app.post('/postData', async (req,res)=>{
    const { value } = req.body;
    setvalue = value;
    console.log(value);
    
    const result = await soundModel.create({
        value
    });
    res.send(result)
})

app.listen(8000, () => {
console.log(`Server is listening at http://localhost:8000`);
});
