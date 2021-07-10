const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema');
require('dotenv').config();

const app = express();
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;

//DB
mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => console.log('Connected to DB'));

// graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

//Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));