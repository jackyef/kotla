# Kotla

_Kota_ (city; in Indonesian) guessing game, inspired by [Katla](https://github.com/pveyes/katla), [wordle](https://www.powerlanguage.co.uk/wordle/) and [worldle](https://worldle.teuteuf.fr/).

---

## How it works

For those who are curious, or are looking for a way to cheat:

1. All cities data are stored in [cities.json](./utils/dataSources/cities.json). ([source](https://simplemaps.com/data/id-cities)). The data will be bundled with the app.
2. [/api/getNumberOfTheDay](./pages/api/getNumberOfTheDay.ts) generates a number given a `dateString`. The number is then used to select a particular city from the list.

List of kabupaten/kota is gotten from: [yusufsyaifudin/wilayah-indonesia](https://github.com/yusufsyaifudin/wilayah-indonesia)