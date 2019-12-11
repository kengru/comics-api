import { validationResult } from "express-validator/check";

exports.getMangas = (req, res, next) => {
  res.status(200).json({
    mangas: [
      {
        title: "Vagabond",
        desc: "A cool Samurai",
        thumbnailUrl: "vagabond.png",
        lastLink: "http://whatever",
        addedDate: "02/02/2011"
      }
    ]
  });
};

exports.postMangas = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({
        message: "Validation failed, entered data is incorrect.",
        errors: errors.array()
      });
  }
  const manga = req.body.manga;
  
  // Add mangas.
  res.status(201).json({
    message: "Manga added successfully!",
    post: { id: new Date().toISOString(), content: manga }
  });
};
