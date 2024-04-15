import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";

import router from './routes/index'; 

dotenv.config();

const app: Express = express();

const limiter = rateLimit({
	windowMs: parseInt(process.env.RATE_LIMIT_TIME || "600"),
	limit: parseInt(process.env.RATE_LIMIT_FRQ || "10"),
});

app.use(limiter);
app.use(bodyParser.json());


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
