import React from 'react'
import AdminMenu from './AdminMenu'
import Chart from 'react-apexcharts';

const AdminDashbord = () => {

  const chartOptions = {
    series: [{
      name: 'Sample Series',
      data: [30, 40, 35, 50, 30, 73, 57, 23, 5, 49, 60, 70, 91, 40, 35, 50, 30, 73, 57, 23, 5, 49, 60, 70, 91,5, 49, 60, 70, 67]
    }],
    options: {
      chart: {
        type: 'area',
       
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        labels: {
          show: false, // Hide x-axis labels
        }
      }
    }
  };

  const chartOptions2 = {
    series: [{
      name: 'Sample Series',
      data: [30,20,15,12,10]
    }],
    options: {
      chart: {
        type: 'area', 
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: false, // Hide x-axis labels
        }
      },
      yaxis: {
        labels: {
          show: false, // Optional: Hide y-axis labels if needed
        },
      },
      zoom: {
        enabled: false, // Disable zoom functionality
      },
      tooltip: {
        enabled: false, // Disable tooltip
      },
      states: {
        hover: {
          enabled: false, // Disable hover effect
        },
      },
      stroke: {
        curve: 'smooth', // Use smooth curve for the line
        width: 2, // Set line width
        colors: ['#008FFB'], // Change line color
      },
    },
  };

  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><AdminMenu/></div>
      <div className='dashbord-content'>
        <div>
          <div className='chart-m-box-container'>
            <div className='chart-m-box'>
              <div className='chart-m-box-heading'>All Time Revnew</div>
              <div className='chart-m-box-price'>$ 40,000</div>
              <Chart options={chartOptions2.options} series={chartOptions.series} type="area" height={100} className="chart-m-box-graph"/>
            </div>
            <div className='chart-m-box'>
              <div className='chart-m-box-heading'>This Month seals</div>
              <div className='chart-m-box-price'>$ 47,804</div>
              <Chart options={chartOptions2.options} series={chartOptions.series} type="area" height={100} className="chart-m-box-graph"/>
            </div>
            <div className='chart-m-box'>
              <div className='chart-m-box-heading'>This Month Ravenew</div>
              <div className='chart-m-box-price'>$ 34,696</div>
              <Chart options={chartOptions2.options} series={chartOptions.series} type="area" height={100} className="chart-m-box-graph"/>
            </div>
          </div>

          
          <div><h2>Sales Analytics</h2></div>
          <Chart options={chartOptions.options} series={chartOptions.series} type="area" height={300} width={600}/>
        </div>
      </div>
    </div>
  )
}

export default AdminDashbord
