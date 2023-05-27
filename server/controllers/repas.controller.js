const db = require("../models");
const Repas = db.repas;

// Create and Save a new Repas
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Repas
  const repas = new Repas({
    nom: req.body.nom,
    ingredient: req.body.ingredient,
    image: req.body.image,
    restaurant: req.body.restaurant,
    secteur: req.body.secteur,
  });

  // Save Repas in the database
  repas
    .save(repas)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Repas.",
      });
    });
};

// Retrieve all Repass from the database.
exports.findAll = (req, res) => {
  const nom = req.query.nom;
  var condition = nom
    ? { nom: { $regex: new RegExp(nom), $options: "i" } }
    : {};

  Repas.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving repas.",
      });
    });
};

// Find a single Repas with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Repas.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Repas with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Repas with id=" + id });
    });
};

// Update a Repas by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Repas.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Repas with id=${id}. Maybe Repas was not found!`,
        });
      } else res.send({ message: "Repas was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Repas with id=" + id,
      });
    });
};

// Delete a Repas with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Repas.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Repas with id=${id}. Maybe Repas was not found!`,
        });
      } else {
        res.send({
          message: "Repas was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Repas with id=" + id,
      });
    });
};

// Delete all Repass from the database.
exports.deleteAll = (req, res) => {
  Repas.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Repass were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all repas.",
      });
    });
};

// Find all image Repass
// exports.findAllPublished = (req, res) => {
//   Tutorial.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };
