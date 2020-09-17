
module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define(
      'Games',
      {
        title: DataTypes.STRING,
        genres: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        likes: DataTypes.INTEGER,
        year: DataTypes.INTEGER,
        description: DataTypes.STRING
      },
      {}
    )
    return Games
  }
  