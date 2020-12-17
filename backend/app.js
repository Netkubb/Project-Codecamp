const express = require('express');
const app = express();
const cors = require('cors');
const user = require('./user/user').router;
const bodyParser = require('body-parser');
const tournament = require('./tournament/tournament')

require('./passport/passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", user);
app.use("/tournament", tournament);

app.get('/', (req, res, next) => {
    console.log("/ is requested");
    res.status(200).send("Hey")
});


const db = require('./database/models');

db.sequelize.sync().then(() => {
    app.listen(8000, () => console.log("Server is running at port 8000"));
})