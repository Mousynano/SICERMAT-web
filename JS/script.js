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

// FETCH DATA
registerListener("hrspo", ["heartRate", "spo"], updateHrSpoData)
registerListener("jump", ["jumpHeight"], fetchDataJump)
registerListener("punch", ["punchPower", "retractionTime"], fetchDataPunch)

client.connect();
///////////////////////////////
