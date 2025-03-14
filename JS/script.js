//NAV BURGER//
var hamburger = document.getElementById('hamburger')
hamburger.addEventListener('click', () => {
   const nav = document.getElementById('nav')
   nav.classList.toggle('openNav')
   hamburger.classList.toggle('isX');
})



//NAV CONTROL//
const contentFrame = document.getElementById('contentFrame');
const punchNav = document.getElementById('punch-nav');
const jumpNav = document.getElementById('jump-nav');
const pushupNav = document.getElementById('pushup-nav');


punchNav.addEventListener('click', function (e) {
   e.preventDefault();
   contentFrame.src = './HTML/punch.html';
});
jumpNav.addEventListener('click', function (e) {
   e.preventDefault();
   contentFrame.src = './HTML/jump.html';
});
pushupNav.addEventListener('click', function (e) {
   e.preventDefault();
   contentFrame.src = './HTML/pushup.html';
});



//HR AND SPO//
var heartValue = 0
var spoValue = 0
var fetchHrSpo = true

var heartRateGauge = new Gauge(document.getElementById('heartRateGauge')).setOptions({
   angle: -0.5,
   lineWidth: 0.1,
   radiusScale: 1.1,
   pointer: {
      length: 0,
      strokeWidth: 0,
      color: 'red'
   },
   limitMax: 'true',
   highDpiSupport: true,
   colorStart: '#ff0000',
   colorStop: '#ff6347',
   strokeColor: '#E0E0E0',
   generateGradient: true
});
heartRateGauge.maxValue = 200;
heartRateGauge.setMinValue(0);
heartRateGauge.set(0);
var spo2Gauge = new Gauge(document.getElementById('spo2Gauge')).setOptions({
   angle: -0.5,
   lineWidth: 0.1,
   radiusScale: 1.1,
   pointer: {
      length: 0,
      strokeWidth: 0,
      color: '#32cd32'
   },
   limitMax: 'true',
   highDpiSupport: true,
   colorStart: '#0000ff',
   colorStop: '#1e90ff',
   strokeColor: '#E0E0E0',
   generateGradient: true
});
spo2Gauge.maxValue = 100;
spo2Gauge.setMinValue(0);
spo2Gauge.set(0);


// FETCH DATA
const updateHrSpoData = (heartRate, spo) => {
   heartRateGauge.set(heartRate);
   spo2Gauge.set(spo);

   $('#heartRateText').text(`${heartRate} BPM`);
   $('#spo2Text').text(`${spo}%`);
}

client.on("message", (data) => {
   if (data.heartRate !== undefined && data.spo !== undefined) {
      updateHrSpoData(data.heartRate, data.spo);
   }else{
      console.warn("Received unexpected data:", data);
   }

   client.send('ACK')
});
///////////////////////////////
