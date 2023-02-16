import authorModel from "../model/authorModel";
import { Response, Request } from "express";
import cloudinary from "../config/cloudinary";

// get:
const getAuthor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const authorDetails = await authorModel.find();

    return res.status(200).json({
      message: "Successfully got author details",
      data: authorDetails,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't get Author details",
      data: error,
    });
  }
};
// getOneAuthor:
const getOneAuthor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const authorDetails = await authorModel.findById(req.params.authorID);
    return res.status(200).json({
      message: `${req.params.authorID} gotten Sucessfully`,
      data: authorDetails,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Couldn't get ${req.params.authorID}`,
      data: error,
    });
  }
};

// Post
const postAuthors = async (req: Request, res: Response): Promise<Response> => {
  try {
    const cloudImage = await cloudinary.uploader.upload(req?.file!.path);
    const ISBN1 = Math.floor(Math.random() * 10000);
    const ISBN2 = Math.floor(Math.random() * 10000);
    const ISBN3 = Math.floor(Math.random() * 10000);
    const ISBN4 = Math.floor(Math.random() * 10000);
    const { authorName } = req.body;
    const authorDetails = await authorModel.find();

    // let test = () => {
    //   return authorDetails.find((e) =>
    //     req.body.authorName === e.authorName ? req.body.remove() : null
    //   );
    // };

    // test();

    const newAuthor = await authorModel.create({
      authorImg: cloudImage.secure_url,
      authorName,
      bio: `Hey there! welcome to ${authorName} space, feel to explore your book interest`,
      ISBN: `${ISBN1}-${ISBN2}-${ISBN3}-${ISBN4}`,
    });
    return res.status(201).json({
      message: "Successfully uploaded a new author",
      data: newAuthor,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't create authors",
      data: error,
    });
  }
};

// update
const updateAuthor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { bio, authorName, authorImg } = req.body;
    const updateProfile = await authorModel.findByIdAndUpdate(
      req.params.id,
      {
        bio,
        authorName,
        authorImg,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "data updated successfully",
      data: updateProfile,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occured",
      data: error,
    });
  }
};

// delete

const deleteAuthorData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const removeAuthor = await authorModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "author deleted successfully",
      data: removeAuthor,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occured",
      data: error,
    });
  }
};

export { getAuthor, getOneAuthor, postAuthors, updateAuthor, deleteAuthorData };
