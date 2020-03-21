export default {
	SET_DATA: (state, data) => {
		const { locations } = data
		const dataCollection = {
      type: 'FeatureCollection',
      features: []
		}
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
	},
	SET_LATEST: (state, latest) => {
		state.latest = latest
	},
	SET_RESULT: (state, result) => {
		const latest = result.latest
		const title = result.province ? `${result.province}, ${result.country}` : result.country
		const series = _ => {
			const timelineConfirmed = Object.entries(result.timelines.confirmed.timeline).map(o => o)
      const timelineDeaths = Object.entries(result.timelines.deaths.timeline).map(o => o)
      const timelineRecovered = Object.entries(result.timelines.recovered.timeline).map(o => o)
      return [
        {
          name: 'Confirmed',
          data: timelineConfirmed
        },
        {
          name: 'Deaths',
          data: timelineDeaths
        },
        {
          name: 'Recovered',
          data: timelineRecovered
        }
      ]
		}
		const timeline = () => {
      const isPlural = (name, total, s) => `<span class="${name}">${total}</span> ${s}${(total > 1) ? 's' : ''}`
			const getPerDay = data => {
				let temp = 0
				const trueTimeline = {}
				data.forEach(a => {
					trueTimeline[a[0]] = a[1] > temp ? a[1] - temp : 0
					temp = a[1]
				})
				return trueTimeline
			}
			const formatDate = val => {
				const d = new Date(val)
				const dtf = new Intl.DateTimeFormat('en', {
					year: 'numeric',
					month: 'short',
					day: '2-digit'
				})
				const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(d)
				return {
					month: mo,
					date: da,
					year: ye
				}
			}
      const perDayConfirmed = getPerDay(Object.entries(result.timelines.confirmed.timeline))
      const perDayDeaths = getPerDay(Object.entries(result.timelines.deaths.timeline))
      const perDayRecovered = getPerDay(Object.entries(result.timelines.recovered.timeline))
      const perDayCases = Object.entries(perDayConfirmed).map(o => {
        let summary = ''
        if (o[1] || perDayDeaths[o[0]] || perDayRecovered[o[0]]) {
          if (o[1]) {
            summary += `${isPlural('confirmed', o[1], 'confirmed case')}`
          }
          if (perDayDeaths[o[0]]) {
						summary += o[1] && perDayRecovered[o[0]] ? ', ' : o[1] ? ' and ' : ''
            summary += `${isPlural('deaths', perDayDeaths[o[0]], 'death')}`
          }
          if (perDayRecovered[o[0]]) {
            summary += o[1] || perDayDeaths[o[0]] ? ' and ' : ''
            summary += `<span class="recovered">${perDayRecovered[o[0]]}</span> recovered`
          }
        }
        return {
          timestamp: formatDate(o[0]),
          summary: summary + '.'
        }
      })
      return perDayCases.filter(o => o.summary !== '.')
		}
		const getPercentage = (data, b) => (data / b) * 100
		const mortality_rate = getPercentage(latest.deaths, latest.confirmed)
		const recovered_rate = getPercentage(latest.recovered, latest.confirmed)
		state.result = {
			title: title,
			latest: latest,
			series: series(),
			timeline: timeline(),
			mortality_rate: mortality_rate.toFixed(2),
			recovered_rate: recovered_rate.toFixed(2)
		}
	},
	SET_COUNTRIES: (state, data) => {
		const groupProvinceByCountry = (array, key) => {
			return array.reduce((result, currentValue) => {
				;(result[currentValue[key]] = result[currentValue[key]] || []).push({
					id: currentValue.id,
					province: currentValue.province
				})
				return result
			}, {})
		}
		state.countries = groupProvinceByCountry(data.locations, 'country')
	}
}
