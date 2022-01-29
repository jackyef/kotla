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

/**
 * @type { import('./cities').City[] }
 */
const output = regencies.map((r) => {
  return {
    name: toTitleCase(r.name.replace('KABUPATEN ', '').replace('KOTA ', '')),
    lat: r.latitude,
    lng: r.longitude,
    province: toTitleCase(provinces.find((p) => p.id === r.province_id).name)
  }
})

fs.writeFileSync(
  path.join(__dirname, 'cities.json'),
  JSON.stringify(output, null, 2)
)
