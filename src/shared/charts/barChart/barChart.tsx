import { Bar } from 'react-chartjs-2'
import { barChartDatasets, chartLabels } from '../../../data'
import { ChartData } from '../../../types'
import { BarElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js'

ChartJS.register(
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface BarChartProps {
  data: ChartData
}

const defaultData = {
  labels: chartLabels,
  datasets: barChartDatasets
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => <div><Bar data={data || defaultData} /></div>
