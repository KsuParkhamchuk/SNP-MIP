import { Accordion } from '../../shared/accordion'
import { Charts, Client, Report, ReportData } from '../../types'
import { BarChart } from '../../shared/charts/barChart'
import { LineChart } from '../../shared/charts/lineChart'
import { PieChart } from '../../shared/charts/pieChart'
import { AreaChart } from '../../shared/charts/areaChart'
import { ReactElement } from 'react'
import { useDeleteClientMutation, useEditClientMutation } from '../../redux/features/apiSlice'
import { faker } from '@faker-js/faker'

interface ClientInfoProps {
  client: Client
}

export const ClientInfo: React.FC<ClientInfoProps> = ({ client }) => {
  const [deleteClient] = useDeleteClientMutation()
  const [updateClient] = useEditClientMutation()

  const renderClientChart = (reportData: ReportData): ReactElement => {
    switch (reportData.type) {
      case Charts.Bar:
        return <BarChart key={`${reportData.type}-${reportData.id}`} data={reportData.chartData} />
      case Charts.Line:
        return <LineChart key={`${reportData.type}-${reportData.id}`} data={reportData.chartData} />
      case Charts.Pie:
        return <PieChart key={`${reportData.type}-${reportData.id}`} data={reportData.chartData} />
      case Charts.Area:
        return <AreaChart key={`${reportData.type}-${reportData.id}`} data={reportData.chartData} />
      default:
        return <p>No such type of chart</p>
    }
  }

  const handleAddDataClick = async (e: React.MouseEvent<HTMLButtonElement>, reportId: string): Promise<void> => {
    // const randomChartDataIndex = Math.floor(Math.random() * chartDatasets.length)
    // const chartData = { id: faker.string.uuid(), type: chartDatasets[randomChartDataIndex] }
    // const updatedClient = {
    //   ...client,
    //   reports: client.reports?.map((report) => {
    //     if (report.id === reportId) {
    //       return [...report]
    //     }
    //   })
    // }
    // const updatedClientReport = {
    //   ...client.reports
    //
    // }
    // try {
    //   await updateClient({ id: client.id, reports })
    // } catch (e) {
    //   console.error('Failed to update client:', e)
    // }
  }

  const addNewReport = async (): Promise<void> => {
    const newReport = { id: faker.string.uuid(), data: [] }
    try {
      if (client.reports) {
        await updateClient({ ...client, reports: [...client.reports, newReport] })
      }
    } catch (error) {
      console.error('Failed to add report:', error)
    }
  }

  const renderClientReport = (report?: Report): ReactElement => {
    return (
      <Accordion
        key={report?.id}
        header="Report"
        btnText="Add data"
        innerText="Report data"
        onBtnClick={async (e) => {
          if (report?.id) {
            await handleAddDataClick(e, report.id)
          }
        }}
        onDeleteBtnClick={async () => {
          if (report?.id) {
            await deleteClient(report?.id)
          }
        }}>
        {report?.data.map((reportData) => renderClientChart(reportData))}
      </Accordion>
    )
  }

  return (
    <Accordion
      header={client.name}
      btnText="Add report"
      innerText={`${client.name} reports`}
      onBtnClick={addNewReport}
      onDeleteBtnClick={async () => await deleteClient(client.id)}>
      {client.reports?.map((report) => renderClientReport(report))}
    </Accordion>
  )
}
