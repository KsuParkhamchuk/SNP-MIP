export interface Client {
  id: string
  name: string
  reports?: Report[]
}

export interface Report {
  id: string
  data: ReportData[]
}

export interface ReportData {
  id: number
  type: string
  chartData: ChartData
}

export interface ChartData {
  labels: string[]
  datasets: Dataset[]
}

export interface Dataset {
  label: string
  data: number[]
  borderColor?: string[]
  backgroundColor?: string[]
  borderWidth?: number
  fill?: boolean
}

export enum Charts {
  Bar = 'bar',
  Line = 'line',
  Pie = 'pie',
  Area = 'area'
}
