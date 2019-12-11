import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "New"
    },
    mangas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Manga"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
