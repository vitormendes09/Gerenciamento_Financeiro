import mongoose, { ConnectOptions } from 'mongoose';

import dotenv from "dotenv";
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${dbUser}:${dbPassword}@localhost:27017/expense-tracker`, {
      useUnifiedTopology: true,
   
    } as ConnectOptions);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Erro ao conectar o banco',err);
    process.exit(1);
  }
};

export default connectDB;