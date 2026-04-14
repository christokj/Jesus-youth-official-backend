import mongoose, { InferSchemaType, Model } from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type AdminDocument = InferSchemaType<typeof adminSchema>;

const AdminModel = (mongoose.models.AdminModel as Model<AdminDocument>) || mongoose.model<AdminDocument>("AdminModel", adminSchema);

export default AdminModel;
