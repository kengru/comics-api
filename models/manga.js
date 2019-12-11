import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mangaSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String
    },
    lastChapter: {
      type: Number,
      required: true
    },
    lastLink: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Manga", mangaSchema);
