import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { areaChartDatasets, chartLabels } from '../../../data'
import { ChartData } from '../../../types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
      text: 'Chart.js Line Chart'
    }
  }
}

const defaultData = {
  labels: chartLabels,
  datasets: areaChartDatasets
}

interface AreaChartProps {
  data: ChartData
}

export const AreaChart: React.FC<AreaChartProps> = ({ data }) => <Line options={options} data={data || defaultData} />
