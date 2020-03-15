import Vue from 'vue'
import { Line } from 'vue-chartjs'

Vue.component('LineChart', {
	extends: Line,
	props: [ 'chartdata', 'options' ],
	mounted() {
		this.renderChart(this.chartdata, this.options)
	}
})
