
global.foodData = require('./db')(function call(err, data, CatData) {
  // console.log(data)
  if(err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
})

const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
const striperoutes = require('./Routes/stripe-route')

app.use(cors())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.REACT_APP_API_END_POINT}`);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/stripe',striperoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

