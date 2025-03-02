import mongoose, { ConnectOptions } from 'mongoose';

import dotenv from "dotenv";
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connectDB = async () => {
  try {
    await mongoose.connect(
       `mongodb+srv://${dbUser}:${dbPassword}@cluster0.uf8gc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      );
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Erro ao conectar ao Banco',err);
    process.exit(1);
  }
};

export default connectDB;