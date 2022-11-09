export const favoriteRecipes = JSON.stringify(
    [
  {
      "id": "11007",
      "type": "drink",
      "nationality": "",
      "category": "Ordinary Drink",
      "alcoholicOrNot": "Alcoholic",
      "name": "Margarita",
      "image": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
  },
  {
      "id": "178319",
      "type": "drink",
      "nationality": "",
      "category": "Cocktail",
      "alcoholicOrNot": "Alcoholic",
      "name": "Aquamarine",
      "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"
  },
  {
      "id": "52772",
      "type": "food",
      "nationality": "Japanese",
      "category": "Chicken",
      "alcoholicOrNot": "",
      "name": "Teriyaki Chicken Casserole",
      "image": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg"
  },
  {
      "id": "15346",
      "type": "drink",
      "nationality": "",
      "category": "Cocktail",
      "alcoholicOrNot": "Alcoholic",
      "name": "155 Belmont",
      "image": "https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg"
  }
]);

export const favoriteRecipesOnlyDrinks = JSON.stringify(
    [
  {
      "id": "11007",
      "type": "drink",
      "nationality": "",
      "category": "Ordinary Drink",
      "alcoholicOrNot": "Alcoholic",
      "name": "Margarita",
      "image": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
  },
  {
      "id": "178319",
      "type": "drink",
      "nationality": "",
      "category": "Cocktail",
      "alcoholicOrNot": "Alcoholic",
      "name": "Aquamarine",
      "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"
  },
  {
      "id": "15346",
      "type": "drink",
      "nationality": "",
      "category": "Cocktail",
      "alcoholicOrNot": "Alcoholic",
      "name": "155 Belmont",
      "image": "https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg"
  }
])

export const doneRecipes = JSON.stringify(
    [
        {
            "id": 52772,
            "type": "comida",
            "nationality": "brazil",
            "category": "comida",
            "alcoholicOrNot": "",
            "name": "name",
            "image": "img",
            "doneDate": "data",
            "tags": [
                "tag1",
                "tag2"
            ]
        }
    ]
)

export const doneRecipes2 = JSON.stringify(
    [
        {
            "id": 52771,
            "type": "food",
            "nationality": "Italian",
            "category": "comida",
            "alcoholicOrNot": "",
            "name": "Spicy Arrabiata Penne",
            "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
            "doneDate": "data",
            "tags": ["Pasta", "Curry"]
        },
        {
            "id": 178319,
            "type": "drink",
            "nationality": "",
            "category": "Cocktail",
            "alcoholicOrNot": "Alcoholic",
            "name": "Aquamarine",
            "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
            "doneDate": "data",
            "tags": null,
        }
    ]
)

export const inProgressRecipes = JSON.stringify({
    cocktails: {
       "178319": ['Hpnotiq', 'Pineapple Juice', 'Banana Liqueur'],
    },
    meals: { },
})