import express from 'express'
import { config } from 'dotenv'

config();

const app = express();

const port = process.env.PORT || 8080;


app.get('/health', (request, response) => {
    const datetime = new Date();
    const body = {
        status: "Server is up and running!",
        datetime
    }
    response.send(body).status(200);
});

app.listen(port, () => console.log(`litening on port ${port}!`));