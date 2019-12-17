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
    source: {
      type: String,
      required: true
    },
    sourceId: {
      type: String,
      required: true
    },
    lastChapter: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Manga", mangaSchema);
