const faker = require("faker");
const fs = require("fs");
faker.locale = "vi";

// random data ;
const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const catelist = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    catelist.push(category);
  });
  return catelist;
};

const randomProductList = (categoryList, numberOfProduct) => {
  if (numberOfProduct <= 0) return [];
  const productList = [];

  for (const category of categoryList) {
    Array.from(new Array(numberOfProduct)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createAt: Date.now(),
        updateAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400,400)
      };

      productList.push(product);
    });
  }
  return productList;
};
console.log(faker.name.findName());
(() => {
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Po",
    },
  };
  fs.writeFile("db.json", JSON.stringify(db), () => {});
})();
