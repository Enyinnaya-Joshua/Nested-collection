import mongoose from "mongoose";

interface author {
  authorName: string;
  bio: string;
  authorImg: string;
  ISBN: string;
  books: {}[];
}

interface iAuthor extends author, mongoose.Document {}

const authorSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  authorImg: {
    type: String,
  },
  ISBN: {
    type: String,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookCollection",
    },
  ],
});

const authorModel = mongoose.model<iAuthor>("authorCollections", authorSchema);
export default authorModel;
