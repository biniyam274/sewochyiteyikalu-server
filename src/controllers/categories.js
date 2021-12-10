const Category = require("../models/categories");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories) {
      return res.status(200).send(categories);
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find comments. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};

exports.postCategory = async (req, res) => {
  try {
    await Category.create({...req.body}, (error, category) => {
      if (error) return res.status(404).send({error});
      return res.status(200).send({category});
    });
  } catch (error) {
    return res.status(404).send({ error });
  }
};

exports.putCategory = async (req, res) => {
  try {
    let { id } = req.body;
    const category = await Category.findOne({ _id: id });
    if (category) {
      Category.findOneAndUpdate(
        { _id: req.body.id },
        { ...req.body },
        (error, category) => {
          if (error) return res.status(404).send({ error });
          return res.send({ category });
        }
      );
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find the Comment. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.body;
  try {
    Category.findOneAndDelete({ _id: id }, (error, category) => {
      if (error) {
        return res
          .status(404)
          .send({ message: "Could not find th comment. Try again later." });
      }
      return res.status(200).send({
        message: "success",
        category,
      });
    });
  } catch (e) {
    return res.status(404).send({ error: e });
  }
};
