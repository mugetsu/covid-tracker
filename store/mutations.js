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
		const cases = confirmed.locations.map((location, index) => {
			return {
				type: 'Feature',
				properties: {
					country: location.country,
					country_code: location.country_code,
					confirmed_count: location.latest,
					recovered_count: recovered.locations[index].latest || 0,
					dead_count: deaths.locations[index].latest || 0,
					province: location.province,
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
		state.country_case = country_case
	}
}
