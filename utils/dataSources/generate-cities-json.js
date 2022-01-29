// This script generate cities.json based on raw/regencies.json and raw/provinces.json

const fs = require('fs')
const path = require('path')

const regencies = require('./raw/regencies.json')
const provinces = require('./raw/provinces.json')

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }

  return array
}

/**
 * @type { import('./cities').City[] }
 */
const output = regencies.map((r) => {
  const isKabupaten = r.name.includes('KABUPATEN ')

  return {
    name: toTitleCase(r.name.replace('KABUPATEN ', '').replace('KOTA ', '')),
    lat: r.latitude,
    lng: r.longitude,
    province: toTitleCase(provinces.find((p) => p.id === r.province_id).name),
    type: isKabupaten ? 'kabupaten' : 'kota'
  }
})

// Shuffle it so it's not sorted by province
// Otherwise it might be too easy to guess since the
// numberOfTheDay is also increasing day-by-day
shuffle(output)

const summary = {}
output.forEach((o) => {
  summary[o.name] = summary[o.name] ? summary[o.name] + 1 : 1
})

fs.writeFileSync(
  path.join(__dirname, 'cities.json'),
  JSON.stringify(output, null, 2)
)
