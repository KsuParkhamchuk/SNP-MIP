import { faker } from '@faker-js/faker'
import { Charts } from '../types'

export const chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const pieChartDatasets = [
  {
    label: '# of Votes',
    data: [faker.number.int(), faker.number.int(), faker.number.int(), faker.number.int(), faker.number.int(), faker.number.int()],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }
]

export const areaChartDatasets = [
  {
    fill: true,
    label: 'Dataset 2',
    data: chartLabels.map(() => faker.number.int({ min: 0, max: 1000 })),
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)'
  }
]

export const barChartDatasets = [
  {
    label: 'Dataset 1',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45]
  }
]

export const lineChartDatasets = [
  {
    label: 'Dataset 1',
    data: chartLabels.map(() => faker.number.int({ min: -1000, max: 1000 })),
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)'
  },
  {
    label: 'Dataset 2',
    data: chartLabels.map(() => faker.number.int({ min: -1000, max: 1000 })),
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)'
  }
]

export const chartDatasets = [{ bar: barChartDatasets }, { line: lineChartDatasets }, { area: areaChartDatasets }, { pie: pieChartDatasets }]
