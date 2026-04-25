import mongoose, { InferSchemaType, Model } from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    programYear: {
      type: Number,
      required: true,
      index: true,
    },
    unit: String,
    address: String,
    mobile: Number,
    place: String,
    maritalStatus: String,
    dob: String,
    parish: String,
    gender: String,
    prayerRequest: {
      type: String,
      default: "",
      trim: true,
    },
    paid: { type: Boolean, default: false },
    visited: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);


export type StudentDocument = InferSchemaType<typeof studentSchema>;

const StudentModel = (mongoose.models.StudentModel as Model<StudentDocument>) || mongoose.model<StudentDocument>("StudentModel", studentSchema);

export default StudentModel;
