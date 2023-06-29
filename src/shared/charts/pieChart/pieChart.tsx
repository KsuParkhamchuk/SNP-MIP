import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { chartLabels, pieChartDatasets } from '../../../data'
import { ChartData } from '../../../types'

ChartJS.register(ArcElement, Tooltip, Legend)

const defaultData = {
  labels: chartLabels,
  datasets: pieChartDatasets
}

interface PieChartProps {
  data: ChartData
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => <Pie data={data || defaultData} />
