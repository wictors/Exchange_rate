import express from 'express';
import routes from './routes/apiRoutes';
import dotenv from 'dotenv';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
setupSwagger(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/exchange_api', routes());

app.get('/', (req, res) => {
  res.send('Server is running ...');
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
