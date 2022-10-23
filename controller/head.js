const user = require("../model/head");

exports.postdetails = (req, res, next) => {
  const { name, email, phone } = req.body;
  console.log(name, email, phone);
  user
    .create({ name, email, phone })
    .then((response) => {
      res.status(201).json({ data: response });
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.getdetails = (req, res, next) => {
  user
    .findAll()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => res.status(500).json(err));
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  user
    .destroy({ where: { id: id } })
    .then((response) => res.status(200).json({ msg: "successful" }))
    .catch((err) => {
      console.log(err);
    });
};
