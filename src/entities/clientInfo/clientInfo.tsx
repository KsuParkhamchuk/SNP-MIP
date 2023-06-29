import { Accordion } from '../../shared/accordion'
import { Charts, Client, Report, ReportData } from '../../types'
import { BarChart } from '../../shared/charts/barChart'
import { LineChart } from '../../shared/charts/lineChart'
import { PieChart } from '../../shared/charts/pieChart'
import { AreaChart } from '../../shared/charts/areaChart'
import React, { ReactElement } from 'react'
import {
  useAddReportDataMutation,
  useAddReportMutation,
  useDeleteClientMutation, useDeleteReportDataMutation,
  useDeleteReportMutation,
  useGetReportDataQuery,
  useGetReportsQuery
} from '../../redux/features/apiSlice'
import { faker } from '@faker-js/faker'
import { chartDatasets, chartLabels } from '../../data'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface ClientInfoProps {
  client: Client
}

export const ClientInfo: React.FC<ClientInfoProps> = ({ client }) => {
  const [deleteClient] = useDeleteClientMutation()
  const [addReport] = useAddReportMutation()
  const [deleteReport] = useDeleteReportMutation()
  const [addReportData] = useAddReportDataMutation()
  const [deleteReportData] = useDeleteReportDataMutation()
  const { data: reports } = useGetReportsQuery()
  const { data: reportData } = useGetReportDataQuery()

  const renderClientChart = (reportData: ReportData): ReactElement => {
    switch (reportData.type) {
      case Charts.Bar:
        return <div key={`${reportData.type}-${reportData.id}`}>
          <BarChart data={reportData.chartData}/>
          <XMarkIcon onClick={async () => await deleteReportData(reportData.id)} className="h-5 w-5" />
        </div>
      case Charts.Line:
        return <div key={`${reportData.type}-${reportData.id}`}>
          <LineChart data={reportData.chartData}/>
          <XMarkIcon onClick={async () => await deleteReportData(reportData.id)} className="h-5 w-5" />
        </div>
      case Charts.Pie:
        return <div key={`${reportData.type}-${reportData.id}`}>
          <PieChart data={reportData.chartData}/>
          <XMarkIcon onClick={async () => await deleteReportData(reportData.id)} className="h-5 w-5" />
        </div>
      case Charts.Area:
        return <div key={`${reportData.type}-${reportData.id}`}>
          <AreaChart data={reportData.chartData}/>
          <XMarkIcon onClick={async () => await deleteReportData(reportData.id)} className="h-5 w-5" />
        </div>
      default:
        return <p>No such type of chart</p>
    }
  }

  const handleAddDataClick = async (e: React.MouseEvent<HTMLButtonElement>, reportId: string): Promise<void> => {
    const randomChartDataIndex = Math.floor(Math.random() * chartDatasets.length)
    const randomDataObject = chartDatasets[randomChartDataIndex]
    const reportData = {
      id: faker.string.uuid(),
      reportId,
      type: randomDataObject.type,
      chartData: {
        labels: chartLabels,
        datasets: randomDataObject.data
      }
    }

    try {
      await addReportData({ id: reportId, reportData })
    } catch (error) {
      console.error('Failed to update client:', error)
    }
  }

  const addNewReport = async (): Promise<void> => {
    const newReport = { id: faker.string.uuid(), clientId: client.id, data: [] }

    try {
      await addReport({ id: client.id, report: newReport })
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
            await deleteReport(report.id)
          }
        }}>
        {reportData?.filter((data: ReportData) => report?.id === data.reportId).map((filteredData) => renderClientChart(filteredData))}
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
      {reports?.filter((report: Report) => client.id === report.clientId).map((clientReport) => renderClientReport(clientReport))}
    </Accordion>
  )
}

export const MemoizedClientInfo = React.memo(ClientInfo)
