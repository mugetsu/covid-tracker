export default {
	SET_DATA: (state, data) => {
		const { confirmed, deaths, recovered } = data
		const dataCollection = {
      type: 'FeatureCollection',
      features: []
		}
		const timeSince = (date) => {
			let seconds = Math.floor((new Date() - date) / 1000)
			let interval = Math.floor(seconds / 31536000)
			if (interval > 1) {
				return interval + ' years'
			}
			interval = Math.floor(seconds / 2592000)
			if (interval > 1) {
				return interval + ' months'
			}
			interval = Math.floor(seconds / 86400)
			if (interval > 1) {
				return interval + ' days'
			}
			interval = Math.floor(seconds / 3600)
			if (interval > 1) {
				return interval + ' hours'
			}
			interval = Math.floor(seconds / 60)
			if (interval > 1) {
				return interval + ' minutes'
			}
			return Math.floor(seconds) + ' seconds'
		}
		const lastUpdate = (history) => {
			const last = new Date(
				Math.max.apply(
					null,
					Object.keys(history).map((d) => {
						return new Date(d)
					})
				)
			)
			return timeSince(last) + ' ago'
		}
		const sortDate = dates => {
			const sorted_date = {}
			Object.keys(dates)
				.sort((a, b) => {
					return new Date(a) - new Date(b)
				})
				.forEach(key => {
					sorted_date[key] = dates[key]
				})
			return sorted_date
		}
		confirmed.locations.forEach((location, index) => {
			const recovered_locations = recovered.locations[index]
			const dead_locations = deaths.locations[index]
			let recovered_count = 0
			let dead_count = 0
			if (
				location.coordinates.long === recovered_locations.coordinates.long
				&& location.coordinates.lat === recovered_locations.coordinates.lat
			) {
				recovered_count = recovered_locations.latest
			}
			if (
				location.coordinates.long === dead_locations.coordinates.long
				&& location.coordinates.lat === dead_locations.coordinates.lat
			) {
				dead_count = dead_locations.latest
			}
			if (location.latest || recovered_count || dead_count) {
				dataCollection.features.push({
					type: 'Feature',
					properties: {
						country: location.country,
						country_code: location.country_code,
						province: location.province,
						confirmed_count: location.latest,
						confirmed_history: sortDate(location.history),
						recovered_count: recovered_count,
						recovered_history: sortDate(recovered_locations.history),
						dead_count: dead_count,
						dead_history: sortDate(recovered_locations.history),
						last_update: lastUpdate(location.history)
					},
					geometry: {
						type: 'Point',
						coordinates: [
							location.coordinates.long,
							location.coordinates.lat
						]
					}
				})
			}
		})	
		state.data = dataCollection
	},
	SET_LATEST: (state, latest) => {
		state.latest = latest
	},
	SET_COUNTRIES: (state, data) => {
		const groupProvinceByCountry = (array, key) => {
			return array.reduce((result, currentValue) => {
				;(result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue.province)
				return result
			}, {})
		}
		state.countries = groupProvinceByCountry(data.locations, 'country')
	},
	SET_COUNTRY_CASE: (state, country_case) => {
		// const merged_history = {}
		// const history = [
		// 	country_case[0].properties.confirmed_history,
		// 	country_case[0].properties.recovered_history,
		// 	country_case[0].properties.dead_history
		// ]
		// history.forEach(item => {
		// 	Object.keys(item).forEach(key => {
		// 		merged_history[key] = merged_history[key] || []
		// 		merged_history[key].push(item[key] || 0)
		// 	})
		// })
		// state.country_case = Object.assign(country_case[0].properties, { merged_history: merged_history })
		state.country_case = Object.assign({}, country_case[0].properties)
	}
}
