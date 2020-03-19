export default {
	SET_DATA: (state, data) => {
		const { locations } = data
		const dataCollection = {
      type: 'FeatureCollection',
      features: []
		}
		// const timeSince = (date) => {
		// 	let seconds = Math.floor((new Date() - date) / 1000)
		// 	let interval = Math.floor(seconds / 31536000)
		// 	if (interval > 1) {
		// 		return interval + ' years'
		// 	}
		// 	interval = Math.floor(seconds / 2592000)
		// 	if (interval > 1) {
		// 		return interval + ' months'
		// 	}
		// 	interval = Math.floor(seconds / 86400)
		// 	if (interval > 1) {
		// 		return interval + ' days'
		// 	}
		// 	interval = Math.floor(seconds / 3600)
		// 	if (interval > 1) {
		// 		return interval + ' hours'
		// 	}
		// 	interval = Math.floor(seconds / 60)
		// 	if (interval > 1) {
		// 		return interval + ' minutes'
		// 	}
		// 	return Math.floor(seconds) + ' seconds'
		// }
		// const lastUpdate = (history) => {
		// 	const last = new Date(
		// 		Math.max.apply(
		// 			null,
		// 			Object.keys(history).map((d) => {
		// 				return new Date(d)
		// 			})
		// 		)
		// 	)
		// 	return timeSince(last) + ' ago'
		// }
		// const sortDate = dates => {
		// 	const sorted_date = {}
		// 	Object.keys(dates)
		// 		.sort((a, b) => {
		// 			return new Date(a) - new Date(b)
		// 		})
		// 		.forEach(key => {
		// 			sorted_date[key] = dates[key]
		// 		})
		// 	return sorted_date
		// }
		locations.forEach((location, index) => {
			if (
				location.latest.confirmed
				|| location.latest.recovered
				|| location.latest.deaths
			) {
				dataCollection.features.push({
					type: 'Feature',
					properties: {
						id: location.id,
						country: location.country,
						country_code: location.country_code,
						province: location.province,
						confirmed_count: location.latest.confirmed,
						recovered_count: location.latest.recovered,
						dead_count: location.latest.deaths
					},
					geometry: {
						type: 'Point',
						coordinates: [
							location.coordinates.longitude,
							location.coordinates.latitude
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
	SET_RESULT: (state, result) => {
		state.result = result
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
