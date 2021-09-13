const express = require('express')
const app = express();
const genReport = require('./gen-report.js');

// genReport('https://ag.hga030.com', 'ccap2938', '123qweASD');
// genReport('https://ag.hga030.com', 'K1728A', 'AAqq2233', 'aass1122');

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.post('/gen', async (req, res) => {
	console.log('hit');
    const {
        target,
        username,
        pwd,
        safeCode
    } = req.body;
    console.log({
        target,
        username,
        pwd,
        safeCode
    })
    await genReport(target, username, pwd, safeCode);
    res.end('ok');
})

app.listen(3000, () => {
    console.log('app is listening on port 3000.');
})
