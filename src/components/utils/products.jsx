function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../utils/menu_images", false, /\.(png|jpe?g|svg)$/)
);

export const products = [
  {
    id: "1",
    title: "Агі Сяке",
    price: 199,
    description:
      "Склад: японський рис, сир філадельфія, смажений лосось, соус унагі, соус спайсі, норі. Вага: 300гр. 6 шматочків",
    image: images["Агі сяке.jpeg"],
  },
  {
    id: "2",
    title: "Акай рол",
    price: 119,
    description:
      "Склад: Рис, сир філадельфія, огірок, ікра тобіка. Вага: 225 гр (8 шматочків)",
    image: images["Акай рол.png"],
  },
  {
    id: "3",
    title: "Боніто",
    price: 110,
    description:
      "Склад: рис, сир філадельфія, смажений лосось, огірок, норі, стружка тунця",
    image: images["Боніто.png"],
  },
  {
    id: "4",
    title: "Дабл дракон",
    price: 199,
    description:
      "Склад: дві половинки ролів філадельфія та золотого дракону. Японський рис, норі, філе лосося, філе вугра, сир філадельфія, огірок, авокадо. Вага: 260г/8 шматочків",
    image: images["Дабл дракон.jpeg"],
  },
  {
    id: "5",
    title: "Ебі рол",
    price: 149,
    description:
      "Склад: японський рис, норі, тигрова креветка темпура, огірок, ікра летючої риби, соус спайсі. Вага: 260г/8шматочків",
    image: images["Ебі рол.jpeg"],
  },
  {
    id: "6",
    title: "Ебі хот",
    price: 219,
    description:
      "Склад: рис, норі, креветка, сир філадельфія, соус спайсі, соус унагі. Вага: 300 г/ 6 шматочків",
    image: images["Ебі хот.jpeg"],
  },
  {
    id: "7",
    title: "Золотий дракон",
    price: 209,
    description:
      "Склад: японський рис, вугор, сир філадельфія, огірок, норі. Вага: 250г/8 шматочків",
    image: images["Золотий дракон.jpeg"],
  },
  {
    id: "8",
    title: "Каліфорнія в кунжуті",
    price: 99,
    description:
      "Склад: японський рис, філе тунця, огірок, авокадо, соус спайсі, норі, кунжут. Вага: 230г/8 шматочків",
    image: images["Каліфорнія в кунжуті.jpeg"],
  },
  {
    id: "9",
    title: "Каліфорнія креветка",
    price: 149,
    description:
      "Склад: рис, тигрова креветка, огірок, авокадо, ікра леткої риби. Вага: 250г/8 шматочків",
    image: images["Каліфорнія креветка.jpeg"],
  },
  {
    id: "10",
    title: "Каліфорнія лосось",
    price: 149,
    description:
      "Склад: рис, лосось, огірок, авокадо, ікра леткої риби. Вага: 250г/8 шматочків",
    image: images["Каліфорнія лосось.jpeg"],
  },
];
