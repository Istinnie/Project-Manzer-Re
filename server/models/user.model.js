module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      nom: String,
      email: String,
      image: String,
      restaurant: String,
      secteur: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
