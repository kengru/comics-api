exports.getMangas = (req, res, next) => {
  res.status(200).json({
    posts: [ {title: "Manga", content: "this does this"} ]
  });
};

exports.postMangas = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // Add mangas.
  res.status(201).json({
    message: "Manga added successfully!",
    post: { id: new Date().toISOString(), title: title, content, content }
  });
};