import { Router } from "express";
import { uploadauthorImage } from "../config/multer";
import {
  deleteAuthorData,
  getAuthor,
  getOneAuthor,
  postAuthors,
  updateAuthor,
} from "../controller/authorController";
const router = Router();

router.route("/").get(getAuthor);
router.route("/:authorID").get(getOneAuthor);
router.route("/newAuthor").post(uploadauthorImage, postAuthors);
router.route("/update/:id").patch(updateAuthor);
router.route("/delete/:id").delete(deleteAuthorData);

export default router;
