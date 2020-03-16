export default {
	SET_DATA: (state, data) => {
		const { confirmed, deaths, recovered } = data
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
		const cases = confirmed.locations
			.reduce((result, currentValue) => {
				if (currentValue.latest) {
					result.push(currentValue)
				}
				return result
			}, [])
			.map((location, index) => {
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
				return {
					type: 'Feature',
					properties: {
						country: location.country,
						country_code: location.country_code,
						province: location.province,
						confirmed_count: location.latest,
						confirmed_history: sortDate(location.history),
						recovered_count: recovered.locations[index].latest || 0,
						recovered_history: sortDate(recovered.locations[index].history),
						dead_count: deaths.locations[index].latest || 0,
						dead_history: sortDate(deaths.locations[index].history),
						last_update: lastUpdate(location.history)
					},
					geometry: {
						type: 'Point',
						coordinates: [ location.coordinates.long, location.coordinates.lat ]
					}
				}
			})
		state.data = {
			type: 'FeatureCollection',
			features: cases
		}
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
