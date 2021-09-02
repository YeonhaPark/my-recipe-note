import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const { DataTypes, Op, Sequelize } = SQ;

const Recipe = sequelize.define('recipe', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contents: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const Ingredient = sequelize.define('ingredient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isChecked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

const Tag = sequelize.define('tag', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
  },
});

Recipe.belongsTo(User);
Recipe.belongsToMany(Ingredient, { through: 'RecipeIngredient' });
Ingredient.belongsToMany(Recipe, { through: 'RecipeIngredient' });
Tag.belongsToMany(Recipe, { through: 'RecipeTag' });
Recipe.belongsToMany(Tag, { through: 'RecipeTag' });

const ATTR = {
  attributes: ['id', 'title', 'contents', 'createdAt', 'updatedAt'],
};
const INCLUDE = {
  include: [
    {
      model: Ingredient,
      attributes: ['id', 'isChecked', 'name'],
    },
    { model: Tag, attributes: ['id', 'title'] },
  ],
};
const ORDER = { order: [['createdAt', 'DESC']] };
export async function getAll(userId) {
  return Recipe.findAll({
    ...ATTR,
    ...INCLUDE,
    where: { userId },
    ...ORDER,
  });
}

export async function getById(id) {
  return Recipe.findOne({ ...ATTR, ...INCLUDE, where: { id } });
}

export async function getByTitle(title) {
  return Recipe.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`,
      },
    },
  });
}

export async function create(recipe) {
  const { title, contents, ingredients, tags, userId } = recipe;

  return Recipe.create(
    { title, contents, ingredients, tags, userId },
    { include: [User, Ingredient, Tag] }
  ).then((data) => {
    return data.dataValues.id;
  });
}

export async function update(id, recipe) {
  return Recipe.update(recipe, { where: { id } });
}

export async function remove(id) {
  return Recipe.findByPk(id).then((recipe) => recipe.destroy());
}
