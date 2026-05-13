import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { productRoutes } from './routes/productRoutes';
import { authRoutes } from './routes/authRoutes';
import { categoryRoutes } from './routes/categoryRoutes';
import { commentRoutes } from './routes/commentRoutes';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);

app.listen(4242, () => {
  console.log('Server running on http://localhost:4242');
});
