const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {
  static associate(models) {
    // A Comment belongs to a User
    this.belongsTo(models.User, {
      foreignKey: "userId",
    });

    // A Comment belongs to a Post
    this.belongsTo(models.Post, {
      foreignKey: "postId",
    });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
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
    modelName: "comment",
  }
);

module.exports = Comment;
