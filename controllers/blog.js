const Blog = require("../models/blog");
const { validationResult } = require('express-validator/check');
var randomString = require('randomstring')
var fs = require('fs')
var path = require('path')

exports.createBlog = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const author = req.body.author;
  const description = req.body.description;
  const image = req.file;
  const blog = req.body.blog;

  var imageName = 'file' + randomString.generate(7) + '.jpg'

  path = __dirname + `/../uploads/${imageName}`
  fs.createWriteStream(path).write(image.buffer)
  console.log(path)

  
  const blg = new Blog({
    id: new Date().toISOString,
    author: author,
    description: description,
    imagePath: imageName,
    blog: blog,
  })

  blg.save()
  .then((result) => {
    return res.status(201).json({
      msg: "blog created successfully",
      blog: {
        id: new Date().toISOString,
        author: author,
        description: description,
        imagePath: imageName,
        blog: blog,
      },
    });
  });
};

exports.retrieveBlog = (req, res, next) => {
  Blog.findById()
    .then(blogs => {
      if (!Blog) {
        const error = new Error("No blog found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Blog Retrieved.",
          blogs: blogs
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}; 

exports.updateBlog = (req, res, next) => {
  const blogId = req.params.blogId
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const author = req.body.author;
  const description = req.body.description;
  const image = req.file;
  const blg = req.body.blog;

  Blog.findById(blogId)
    .then((blog) => {
      blog.author = author;
      blog.description = description;
      blog.image = image;
      blog.blog = blg;
      return blog.save();
    })
    .then(blog => {
      res.status(201).json({ message: "UPDATED SUCCESSFULLY", blog: blog });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteBlog = (req, res, next) => {
  const blogId = req.params.blogId
  Blog.findByIdAndRemove(blogId)
    .then((blog) => {
      if (!Blog) {
        const error = new Error('Could not find blog.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ msg: "Blog Deleted" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
