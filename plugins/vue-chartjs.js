import Vue from 'vue'
import { Line } from 'vue-chartjs'

Vue.component('LineChart', {
	extends: Line,
	props: [ 'chartData', 'options' ],
	mounted() {
		this.renderChart(this.chartData, this.options)
	}
})
