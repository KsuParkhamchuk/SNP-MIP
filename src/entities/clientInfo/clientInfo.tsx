import { Accordion } from '../../shared/accordion'
import { Charts, Client, Report, ReportData } from '../../types'
import { BarChart } from '../../shared/charts/barChart'
import { LineChart } from '../../shared/charts/lineChart'
import { PieChart } from '../../shared/charts/pieChart'
import { AreaChart } from '../../shared/charts/areaChart'
import React, { ReactElement, useEffect } from 'react'
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
import { toast } from 'react-toastify'

interface ClientInfoProps {
  client: Client
}

export const ClientInfo: React.FC<ClientInfoProps> = ({ client }) => {
  const [deleteClient] = useDeleteClientMutation()
  const [addReport] = useAddReportMutation()
  const [deleteReport] = useDeleteReportMutation()
  const [addReportData] = useAddReportDataMutation()
  const [deleteReportData] = useDeleteReportDataMutation()
  const { data: reports, isError: isErrorLoadingReports, isLoading: isReportsLoading } = useGetReportsQuery()
  const { data: reportData, isError: isErrorLoadingReportData, isLoading: isReportDataLoading } = useGetReportDataQuery()
  const filteredReports = reports?.filter((report: Report) => client.id === report.clientId)

  useEffect(() => {
    if (isErrorLoadingReportData) {
      notify('Error while loading report data')
    }
    if (isErrorLoadingReports) {
      notify('Error while loading reports')
    }
  }, [isErrorLoadingReportData, isErrorLoadingReports])

  const notify = (message: string): void => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
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
      notify('Failed to add report data')
      console.error('Failed to add report data:', error)
    }
  }

  const addNewReport = async (): Promise<void> => {
    const newReport = { id: faker.string.uuid(), clientId: client.id, data: [] }

    try {
      await addReport({ id: client.id, report: newReport })
    } catch (error) {
      notify('Failed to add report')
      console.error('Failed to add report:', error)
    }
  }

  const renderClientChart = (reportData: ReportData): ReactElement => {
    if (isReportDataLoading) {
      return <div>Loading...</div>
    }

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

  const renderClientReport = (report: Report, index: number): ReactElement => {
    const filteredData = reportData?.filter((data: ReportData) => report?.id === data.reportId)

    if (isReportsLoading) {
      return <div>Loading...</div>
    }

    return (
      <Accordion
        key={report?.id}
        header={`Report ${++index}`}
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
        <>
          {filteredData?.map((filteredData) => renderClientChart(filteredData))}
          {filteredData?.length === 0 && <p>No data available</p> }
        </>
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
      <>
        {filteredReports?.map((clientReport, index) => renderClientReport(clientReport, index))}
        {filteredReports?.length === 0 && <p>No data available</p>}
      </>
    </Accordion>
  )
}

export const MemoizedClientInfo = React.memo(ClientInfo)
