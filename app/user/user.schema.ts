import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { type IUser } from "./user.dto";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    password: { type: String, required: true },
    refreshToken: { type: String, default: null },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }]
  },
  { timestamps: true }
);

// Hash password only if modified
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export default mongoose.model<IUser>("User", UserSchema);
