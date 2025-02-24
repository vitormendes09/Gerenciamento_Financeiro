import mongoose from "mongoose";
import { IUser } from "../../contract/entities/IUser";

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const User = mongoose.model<IUser>("User", UserSchema);
