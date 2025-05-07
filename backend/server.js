const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    const sum = Number(num1) + Number(num2);
    res.json({ sum });
});

app.listen(5000, () => {
    console.log('Backend server running on port 5000');
});
