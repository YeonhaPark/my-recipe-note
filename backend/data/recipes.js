import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const { DataTypes, Op } = SQ;
const Ingredient = sequelize.define('ingredient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isChecked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

const Recipe = sequelize.define('recipe', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contents: {
    type: DataTypes.TEXT,
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
    type: DataTypes.STRING(12),
    unique: true,
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

export async function getAllTags(userId, title) {
  if (title) {
    return Tag.findAll({
      attributes: ['id', 'title'],
      include: {
        attributes: [],
        model: Recipe,
        where: {
          userId,
          title: { [Op.like]: `%${title}%` },
        },
      },
    });
  } else {
    return Tag.findAll({
      attributes: ['id', 'title'],
      include: {
        attributes: [],
        model: Recipe,
        where: { userId },
      },
    });
  }
}

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

export async function getByTitle({ userId, title, tag }) {
  if (title && tag) {
    return Recipe.findAll({
      where: {
        userId,
        title: {
          [Op.like]: `%${title}%`,
        },
      },
      include: {
        model: Tag,
        where: { title: tag },
      },
    });
  } else if (title) {
    return Recipe.findAll({
      where: {
        userId,
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
  } else if (tag) {
    return Recipe.findAll({
      where: {
        userId,
      },
      include: {
        model: Tag,
        where: { title: tag },
      },
    });
  }
}

export async function create(recipe) {
  const { title, contents, ingredients, tags, userId } = recipe;
  // ????????? ????????? ??????????????? ??? ?????? title??? ?????? tag table??? ????????? create ?????? ??????
  // recipeTag ???????????? ?????? ?????? id, recipeId relation??? ???????????????.
  return Recipe.create(
    { title, contents, ingredients, tags, userId },
    { include: [User, Ingredient, Tag] }
  ).then((data) => {
    return data.dataValues.id;
  });
}

export async function update(id, recipe) {
  const { title, contents, ingredients, tags } = recipe;
  const newIngredients = await Ingredient.bulkCreate(ingredients, {
    updateOnDuplicate: ['name'],
    through: 'RecipeIngredient',
    include: { model: Recipe, where: { id } },
    ignoreDuplicates: true,
  });
  const newTags = await Tag.bulkCreate(tags, {
    updateOnDuplicate: ['title'],
    through: 'RecipeTag',
    include: { model: Recipe, where: { id } },
    ignoreDuplicates: true,
  }); // ????????? ????????? ???????????? ??????.
  console.log('new tags::', newTags);
  const updatedRecipe = await Recipe.findOne({
    ...ATTR,
    ...INCLUDE,
    where: { id },
  });

  await updatedRecipe.addIngredients(newIngredients);
  await updatedRecipe.addTags(newTags);

  return Recipe.update({ title, contents }, { where: { id } });
}

export async function remove(id) {
  return Recipe.findByPk(id).then((recipe) => recipe.destroy());
}
