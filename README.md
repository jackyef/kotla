# Kotla

_Kota_ (city; in Indonesian) guessing game, inspired by [Katla](https://github.com/pveyes/katla), [wordle](https://www.powerlanguage.co.uk/wordle/) and [worldle](https://worldle.teuteuf.fr/).

---

## How it works

For those who are curious, or are looking for a way to cheat:

1. All cities (around 8k+) data are stored in [cities.json](./utils/dataSources/cities.json). ([source](https://simplemaps.com/data/id-cities)). The data will be bundled with the app.
2. [/api/getNumberOfTheDay](./pages/api/getNumberOfTheDay.ts) generates a number given a `dateString`. The number is then used to select a particular city from the list.

## Thoughts

The current cities data aren't exhaustive, but 8k+ is a good enough number to get the game going.

Ideally, we want to only include the top `n` cities with most population. `n` can be any number above 5k. This way, we avoid having too many cities that people might not know about.
