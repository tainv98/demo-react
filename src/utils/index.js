export const getCategories = (data) => {
  const categoriesOrigin = new Set();
  let types = data.reduce((obj, category) => {
    categoriesOrigin.add(category.hierarchicalCategories.lvl0);
    if (!obj[category.type]) {
      obj[category.type] = 0;
    }
    obj[category.type]++;
    return obj;
  }, {});

  let brands = data.reduce((obj, category) => {
    if (!obj[category.brand]) {
      obj[category.brand] = 0;
    }
    obj[category.brand]++;
    return obj;
  }, {});

  let categories = [...categoriesOrigin].slice(0, 10);
  categories = categories.map((category) => {
    return {
      name: category,
      level: 0,
      isActive: false,
    };
  });
  types = Object.entries(types)
    .sort((a, b) => -a[1] + b[1])
    .slice(0, 5)
    .map(([key, value]) => {
      return { type: key, quantity: value, checked: false };
    });
  brands = Object.entries(brands)
    .sort((a, b) => -a[1] + b[1])
    .map(([key, value]) => {
      return { type: key, quantity: value, checked: false };
    });
  return { categories, types, brands };
};

export const getCategoriesLv1 = (data, oldCategories, category) => {
  const childCategories = new Set();
  let types = data.reduce((obj, category) => {
    const childItem = category.hierarchicalCategories.lvl1
      ?.split(">")[1]
      .trim();
    if (childItem) {
      childCategories.add(
        category.hierarchicalCategories.lvl1?.split(">")[1].trim()
      );
    }
    if (!obj[category.type]) {
      obj[category.type] = 0;
    }
    obj[category.type]++;
    return obj;
  }, {});

  let brands = data.reduce((obj, category) => {
    if (!obj[category.brand]) {
      obj[category.brand] = 0;
    }
    obj[category.brand]++;
    return obj;
  }, {});

  let children = [...childCategories].slice(0, 10);
  children = children.map((category) => {
    return {
      name: category,
      level: 1,
      isActive: false,
    };
  });

  const indexChange = oldCategories.findIndex(
    (cateItem) => cateItem.name === category
  );
  oldCategories = oldCategories.map((category) => {
    delete category.children;
    return {
      ...category,
      isActive: false,
    };
  });
  oldCategories[indexChange] = {
    ...oldCategories[indexChange],
    children: children,
    isActive: true,
  };

  types = Object.entries(types)
    .sort((a, b) => -a[1] + b[1])
    .slice(0, 5)
    .map(([key, value]) => {
      return { type: key, quantity: value, checked: false };
    });

  brands = Object.entries(brands)
    .sort((a, b) => -a[1] + b[1])
    .map(([key, value]) => {
      return { type: key, quantity: value, checked: false };
    });

  return { categories: oldCategories, types, brands };
};

export const getCategoriesLv2 = (data, oldCategories, category) => {
  let types = data.reduce((obj, category) => {
    if (!obj[category.type]) {
      obj[category.type] = 0;
    }
    obj[category.type]++;
    return obj;
  }, {});

  let brands = data.reduce((obj, category) => {
    if (!obj[category.brand]) {
      obj[category.brand] = 0;
    }
    obj[category.brand]++;
    return obj;
  }, {});

  const indexChange = oldCategories.findIndex((cateItem) => cateItem.children);
  let children = oldCategories[indexChange].children;
  const indexChangeChild = children.findIndex(
    (cateItem) => cateItem.name === category.name
  );
  children = children.map((item) => {
    return { ...item, isActive: false };
  });
  children[indexChangeChild].isActive = true;

  oldCategories[indexChange] = {
    ...oldCategories[indexChange],
    children: children,
  };

  types = Object.entries(types)
    .sort((a, b) => -a[1] + b[1])
    .slice(0, 5)
    .map(([key, value]) => {
      return { type: key, quantity: value, checked: false };
    });

  brands = Object.entries(brands)
    .sort((a, b) => -a[1] + b[1])
    .map(([key, value]) => {
      return { type: key, quantity: value, checked: false };
    });

  return { categories: oldCategories, types, brands };
};
