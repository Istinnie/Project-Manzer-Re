module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      nom: String,
      ingredient: String,
      image: String,
      restaurant: String,
      secteur: String,
      auteur: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Repas = mongoose.model("repas", schema);
  return Repas;
};
