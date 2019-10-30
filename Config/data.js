// Mock data object used for LineChart and BarChart

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      data: [
        50,
        20,
        2,
        86,
        71,
        100
      ],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    },{
      data: [
        20,
        10,
        4,
        56,
        87,
        90
      ]
    },{
      data: [
        30,
        90,
        67,
        54,
        10,
        2
      ]
    }]
  }

// Mock data object for Progress

  const progressChartData = [0.4,0.6,0.1,0.4,0.7,0.3,0.5,0.9]
const progressChartDat2 = [0.6]

  export { data, progressChartData,progressChartDat2 }
