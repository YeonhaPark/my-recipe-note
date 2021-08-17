let allRecipes = [
  {
    id: '8',
    title: 'taco',
    ingredients: [
      { id: 1, name: '또띠야 10장' },
      { id: 2, name: '오래가노 20g' },
    ],
    contents: 'sldkfjlskdjfasdfsadf',
    tags: [{ color: 'error', label: '자주먹는' }],
    createdAt: '2021-08-15T02:22:35.155Z',
    modifiedAt: '2021-08-15T02:22:35.155Z',
  },
  {
    id: '9',
    title: '김치볶음밥',
    ingredients: [
      { id: 1, name: '김칩1포기' },
      { id: 2, name: '양파1개' },
    ],
    contents: 'sldkfjlskdjfasdfsadf',
    tags: [{ color: 'error', label: '자주먹는' }],
    createdAt: '2021-08-15T02:22:35.155Z',
    modifiedAt: '2021-08-15T02:22:35.155Z',
  },
  {
    id: '10',
    title: '크로아상',
    ingredients: [
      { id: 1, name: '중력분 250그램' },
      { id: 2, name: '소금 한꼬집' },
      { id: 3, name: '설탕 80그램' },
    ],
    contents: 'sldkfjlskdjfasdfsadf',
    tags: [
      { color: 'error', label: 'french' },
      { color: 'default', label: 'dessert' },
    ],
    createdAt: '2021-08-15T02:22:35.155Z',
    modifiedAt: '2021-08-15T02:22:35.155Z',
  },
];

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
