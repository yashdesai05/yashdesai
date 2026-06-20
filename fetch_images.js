import fs from 'fs';
import { Buffer } from 'buffer';

async function download(url, dest) {
  try {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`Downloaded ${dest}`);
  } catch (error) {
    console.error(`Failed to download ${url}: ${error}`);
  }
}

async function fetchDesserts() {
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
    const data = await res.json();
    const meals = data.meals.slice(0, 3);
    await download(meals[0].strMealThumb, 'public/hotel/tiramisu.jpg');     // Replace id with names
    await download(meals[1].strMealThumb, 'public/hotel/chocolate.jpg');
    await download(meals[2].strMealThumb, 'public/hotel/tart.jpg');
  } catch (e) {
    console.log("Dessert fetch failed", e);
  }
}

async function fetchDrinks() {
  const drinksToFetch = ['margarita', 'mojito', 'martini', 'old fashioned', 'negroni', 'spritz', 'smash', 'daiquiri'];
  try {
    for (const query of drinksToFetch) {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      if (data.drinks && data.drinks.length > 0) {
        await download(data.drinks[0].strDrinkThumb, `public/hotel/${query.replace(' ', '_')}.jpg`);
      }
    }
  } catch (e) {
    console.log("Drink fetch failed", e);
  }
}

async function run() {
  await fetchDesserts();
  await fetchDrinks();
  console.log("Finished downloading images!");
}

run();
