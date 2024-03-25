import express from 'express';
import mongoose,  { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes';
import listingRoutes from './routes/listingRoutes';
import reviewRoutes from './routes/reviewRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.DB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});