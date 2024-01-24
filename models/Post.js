const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {
  static associate(models) {
    // A Post belongs to a User
    this.belongsTo(models.User, {
      foreignKey: "userId",
    });

    // A Post has many Comments
    this.hasMany(models.Comment, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "post",
  }
);

module.exports = Post;
