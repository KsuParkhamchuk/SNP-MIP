import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { chartLabels, lineChartDatasets } from '../../../data'
import { ChartData } from '../../../types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Line Chart'
    }
  }
}

const defaultData = {
  labels: chartLabels,
  datasets: lineChartDatasets
}

interface LineChartProps {
  data: ChartData
}

export const LineChart: React.FC<LineChartProps> = ({ data }) => <Line options={options} data={data || defaultData} />
