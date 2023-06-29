export interface Client {
  id: string
  name: string
}

export interface Report {
  id: string
  clientId: string
}

export interface ReportData {
  id: string
  reportId: string
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
  borderColor?: string[] | string
  backgroundColor?: string[] | string
  borderWidth?: number
  fill?: boolean
}

export enum Charts {
  Bar = 'bar',
  Line = 'line',
  Pie = 'pie',
  Area = 'area'
}
