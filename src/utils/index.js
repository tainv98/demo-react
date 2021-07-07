export const getCategoriesLv1 = (data, oldCategories, category) => {
  //Day la phan slice data
  const childCategories = new Set();
  if (category.level === 0 && !category.isActive) {
    var types = data.reduce((obj, category) => {
      const childItem = category.hierarchicalCategories.lvl1
        ?.split(">")[1]
        .trim();
      if (childItem) {
        childCategories.add(childItem); // lay duoc name category lv1 add vao childCategories
      }
      if (!obj[category.type]) {
        obj[category.type] = 0;
      }
      obj[category.type]++;
      return obj;
    }, {});
  } else if (category.level === 1 && !category.isActive) {
    var types = data.reduce((obj, category) => {
      const childItem = category.hierarchicalCategories.lvl2
        ?.split(">")[2]
        .trim();
      if (childItem) {
        childCategories.add(childItem);
      }
      if (!obj[category.type]) {
        obj[category.type] = 0;
      }
      obj[category.type]++;
      return obj;
    }, {});
  } else {
    var types = data.reduce((obj, category) => {
      childCategories.add(category.hierarchicalCategories.lvl0);
      if (!obj[category.type]) {
        obj[category.type] = 0;
      }
      obj[category.type]++;
      return obj;
    }, {});
  }
  let children = [...childCategories].slice(0, 10); //cat de lay 10 item
  // Day la` phan merge data
  if (Object.keys(category).length === 0) {
    oldCategories = children.map((category) => {
      return {
        name: category,
        level: 0,
        isActive: false,
      };
    });
  } else if (category.level === 0 && children.length) {
    children = children.map((category) => {
      return {
        name: category,
        level: 1,
        isActive: false,
      };
    });
    const indexChange = oldCategories.findIndex(
      (cateItem) => cateItem.name === category.name // tim` index cua item dc click
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

    if (category.isActive) {
      oldCategories = oldCategories.map((category) => {
        delete category.children;
        return {
          ...category,
          isActive: false,
        };
      });
    }
  } else if (category.level === 1 && children.length) {
    const indexLv0 = oldCategories.findIndex((cateItem) => cateItem.children);
    const indexLv1 = oldCategories[indexLv0].children.findIndex(
      (cateItem) => cateItem.name === category.name
    );
    children = children.map((item) => {
      return {
        name: item,
        level: 2,
        isActive: false,
      };
    });

    oldCategories[indexLv0].children[indexLv1] = {
      ...oldCategories[indexLv0].children[indexLv1],
      children: children,
      isActive: true,
    };

    if (category.isActive) {
      oldCategories[indexLv0].children[indexLv1].isActive = false;
    }
  }

  types = Object.entries(types)
    .sort((a, b) => -a[1] + b[1])
    .slice(0, 5)
    .map(([key, value]) => {
      return { type: key, quantity: value, checked: false };
    });
  let brands = data.reduce((obj, category) => {
    if (!obj[category.brand]) {
      obj[category.brand] = 0;
    }
    obj[category.brand]++;
    return obj;
  }, {});
  brands = Object.entries(brands)
    .sort((a, b) => -a[1] + b[1])
    .map(([key, value]) => {
      return { type: key, quantity: value, checked: false };
    });
  return { categories: oldCategories, types, brands };
};
