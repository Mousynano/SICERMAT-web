//1) VARIABLES//
var punchCount = 0
var maxPower = 0;
var punchPowers = [];
var timeElapsedPunch = 0
var allPunchData = [];
var fetchPunch = false

//2) GAUGES//
const punchPowerGauge = new Gauge(document.getElementById('punchPowerGauge')).setOptions({
   angle: 0.1,
   lineWidth: 0.44,
   radiusScale: 0.6,
   pointer: {
      length: 0.9,
      strokeWidth: 0.035,
      color: '#ffffff'
   },
   staticLabels: {
      font: "10px sans-serif",
      labels: [0, 20, 40, 60, 80, 100],
      color: "white",
      fractionDigits: 0
   },
   limitMax: true,
   highDpiSupport: true,
   colorStart: '#6FADCF',
   colorStop: '#4F89A1',
   strokeColor: '#E0E0E0',
   generateGradient: true
});
punchPowerGauge.maxValue = 100;
punchPowerGauge.setMinValue(0);
punchPowerGauge.set(0);

const retractionPowerGauge = new Gauge(document.getElementById('retractionPowerGauge')).setOptions({
   angle: 0.1,
   lineWidth: 0.44,
   radiusScale: 0.6,
   pointer: {
      length: 0.9,
      strokeWidth: 0.035,
      color: '#ffffff'
   },
   staticLabels: {
      font: "10px sans-serif",
      labels: [0, 20, 40, 60, 80, 100],
      color: "white",
      fractionDigits: 0
   },
   limitMax: true,
   highDpiSupport: true,
   colorStart: '#FF6F6F',
   colorStop: '#FF4F4F',
   strokeColor: '#E0E0E0',
   generateGradient: true
});
retractionPowerGauge.maxValue = 100;
retractionPowerGauge.setMinValue(0);
retractionPowerGauge.set(0);

//3) CHART//
const ctx = document.getElementById('powerChart').getContext('2d');
const powerChart = new Chart(ctx, {
   type: 'line',
   data: {
      labels: [],
      datasets: [{
         label: 'Punch Power',
         data: [],
         borderColor: 'rgba(54, 162, 235, 1)',
         borderWidth: 1,
         fill: false,
      }, {
         label: 'Retraction Power',
         data: [],
         borderColor: 'rgba(255, 99, 132, 1)',
         borderWidth: 1,
         fill: false,
      }],
   },
   options: {
      responsive: true,
      scales: {
         y: {
            beginAtZero: true,
            ticks: {
               color: 'white'
            },
            grid: {
               color: 'rgba(255, 255, 255, 0.2)'
            }
         },
         x: {
            ticks: {
               color: 'white'
            },
            grid: {
               color: 'rgba(255, 255, 255, 0.2)'
            }
         }
      },
      plugins: {
         legend: {
            labels: {
               color: 'white'
            }
         }
      }
   }
})

document.getElementById("export-punch").addEventListener("click", function () {
   let csvContent = "Time,Punch Power,Retraction Power\n";
   allPunchData.forEach(entry => {
      csvContent += `${entry.time},${entry.punchPower},${entry.retractionPower}\n`;
   });
   const blob = new Blob([csvContent], { type: "text/csv" });
   const url = URL.createObjectURL(blob);

   const link = document.createElement("a");
   link.href = url;
   link.download = "punch_data.csv";
   link.click();

   URL.revokeObjectURL(url);
});

//4) FETCH DATA//
const fetchDataPunch = () => {
   if (fetchPunch) {

      punchCount++
      punchPower = Math.floor(Math.random() * 100) + 1
      retractionPower = Math.floor(Math.random() * 100) + 1

      allPunchData.push({
         time: `Time ${timeElapsedPunch + 1}`,
         punchPower: punchPower,
         retractionPower: retractionPower
      });

      $('#punchCount').text(punchCount);
      $('#punchPower').text(punchPower);
      $('#retractionPower').text(retractionPower);
      punchPowerGauge.set(punchPower);
      retractionPowerGauge.set(retractionPower);
      maxPower = Math.max(maxPower, punchPower);
      $('#maxPower').text(maxPower);

      punchPowers.push(punchPower);
      const avgPower = punchPowers.reduce((sum, power) => sum + power, 0) / punchPowers.length;
      $('#avgPower').text(avgPower.toFixed(2));


      timeElapsedPunch++;
      if (timeElapsedPunch > 10) {
         powerChart.data.labels.shift();
         powerChart.data.datasets.forEach(dataset => {
            dataset.data.shift();
         });
      }

      powerChart.data.labels.push(`Time ${timeElapsedPunch}`);
      powerChart.data.datasets[0].data.push(punchPower);
      powerChart.data.datasets[1].data.push(retractionPower);
      powerChart.update();
   }
}

//6) START AND RESET BUTTONS//
var strPunch = document.getElementById('str-punch')
var rstPunch = document.getElementById('rst-punch')
strPunch.addEventListener('click', () => startExercise())
rstPunch.addEventListener('click', () => resetExercise())
function startExercise() {
   fetchPunch = !fetchPunch
   strPunch.textContent = fetchPunch ? "Pause" : "Start"
}
function resetExercise() {

   punchCount = 0
   maxPower = 0;
   punchPowers = [];
   timeElapsedPunch = 0
   fetchPunch = false

   $('#punchCount').text('0');
   $('#punchPower').text('0');
   $('#retractionPower').text('0');
   $('#avgPower').text('0');
   $('#maxPower').text('0');

   punchPowerGauge.set(0);
   retractionPowerGauge.set(0);
   powerChart.data.labels = [];
   powerChart.data.datasets.forEach(dataset => {
      dataset.data = [];
   });
   powerChart.update();
   strPunch.textContent = "Start"
}

setInterval(fetchDataPunch, 1000);