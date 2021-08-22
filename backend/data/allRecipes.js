let allRecipes = [
  {
    id: '8',
    title: 'taco',
    ingredients: [
      { id: 1, isChecked: true, name: '또띠야 10장' },
      { id: 2, isChecked: false, name: '오래가노 20g' },
    ],
    contents: 'sldkfjlskdjfasdfsadf',
    tags: ['자주먹는'],
    createdAt: new Date().toString(),
    modifiedAt: new Date().toString(),
  },
  {
    id: '9',
    title: '김치볶음밥',
    ingredients: [
      { id: 1, isChecked: true, name: '김칩1포기' },
      { id: 2, isChecked: true, name: '양파1개' },
    ],
    contents: 'sldkfjlskdjfasdfsadf',
    tags: ['자주먹는'],
    createdAt: new Date().toString(),
    modifiedAt: new Date().toString(),
  },
  {
    id: '10',
    title: '크로아상',
    ingredients: [
      { id: 1, isChecked: true, name: '중력분 250그램' },
      { id: 2, isChecked: true, name: '소금 한꼬집' },
      { id: 3, isChecked: true, name: '설탕 80그램' },
    ],
    contents: 'sldkfjlskdjfasdfsadf',
    tags: ['french', 'dessert'],
    createdAt: new Date().toString(),
    modifiedAt: new Date().toString(),
  },
];

/**
 * DB단과 연결되는 부분
 *
 */

export async function getAll() {
  return allRecipes;
}

export async function getById(id) {
  return allRecipes.find((recipe) => id === recipe.id);
}

export async function getByTitle(title) {
  return allRecipes.filter((recipe) => {
    if (title === recipe.title || recipe.title.includes(title)) return true;
  });
}

export async function create(recipe) {
  console.log(recipe);
  allRecipes.unshift(recipe);
}

export async function update(id, recipe) {
  const keys = Object.keys(recipe);

  const selected = allRecipes.find((recipe) => recipe.id === id);
  if (selected) {
    selected.modifiedAt = Date.now().toString();

    keys.forEach((key) => {
      selected[key] = recipe[key];
    });
    return selected;
  } else {
    return selected;
  }
}

export async function remove(id) {
  const itemToDelete = allRecipes.find((recipe) => recipe.id === id);
  const idx = allRecipes.indexOf(itemToDelete);

  if (idx !== -1) {
    return allRecipes.splice(idx, 1); // 해당 아이디의 인덱스 찾기
  } else {
    return undefined;
  }
}
