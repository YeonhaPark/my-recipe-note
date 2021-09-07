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

  return Recipe.create(
    { title, contents, ingredients, tags, userId },
    { include: [User, Ingredient, Tag] }
  ).then((data) => {
    return data.dataValues.id;
  });
}

export async function update(id, recipe) {
  const { title, contents, ingredients, tags } = recipe;
  const ingredientsss = await Ingredient.bulkCreate(ingredients, {
    updateOnDuplicate: ['name', 'isChecked'],
    through: 'RecipeIngredient',
    include: { model: Recipe, where: { id } },
  });
  const tagsss = await Tag.bulkCreate(tags, {
    updateOnDuplicate: ['title', 'updatedAt'],
    through: 'RecipeTag',
    include: { model: Recipe, where: { id } },
  }); // 기존에 있으면 생성하지 말것.
  console.log('sss::', tagsss);

  const updatedRecipe = await Recipe.findOne({
    ...ATTR,
    ...INCLUDE,
    where: { id },
  });

  await updatedRecipe.addIngredients(ingredientsss);
  await updatedRecipe.addTags(tagsss);

  return Recipe.update({ title, contents }, { where: { id } });
}

export async function remove(id) {
  return Recipe.findByPk(id).then((recipe) => recipe.destroy());
}
