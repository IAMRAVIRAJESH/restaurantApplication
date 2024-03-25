import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface User {
  username: string;
  email: string;
  password: string;
  role: 'BusinessOwner' | 'User' | 'Admin';
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['BusinessOwner', 'User', 'Admin'] },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<User>("User", userSchema);

export default User;