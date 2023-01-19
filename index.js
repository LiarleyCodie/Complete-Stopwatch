
const timerEl = document.querySelector(".timer");
const startBtnEl = document.querySelector('.start');
const stopBtnEl = document.querySelector('.stop');
const thirdBtnEl = document.querySelector('.thirdBtn');
const moments = []
var interval;
var areRunning = false

function createTime() {
  const time = {
    h: 0,
    m: 0,
    s: 0,
    ms: 0
  }
  return time
}

var time = createTime()

startBtnEl.onclick = () => {
  if (!areRunning) {
    interval = setInterval(function() {
      updateTime()
      renderTime()
    }, 1000 / 100)
    areRunning = true
    startButton(true)
    stopButton(true)
    thirdButton(true)
    switchFirstButton("running")
    switchThirdButton()
  }
}
stopBtnEl.onclick = () => {
  clearInterval(interval)
  areRunning = false
  startButton(false)
  stopButton(false)
  switchFirstButton(true)
  switchThirdButton()
}
thirdBtnEl.onclick = () => {
  // when the third button is 'reset'
  if (!areRunning) {
    time = createTime()
    renderTime()
    thirdButton(false)
    switchFirstButton(false)
  }
  
  // when the third button is 'lap'
  if (areRunning) {
    alert('Moment marked')
  }
}

function renderTime() {
  let msString = time.ms < 10 ? '0' + time.ms : time.ms
  let sString = time.s < 10 ? '0' + time.s : time.s
  let mString = time.m < 10 ? '0' + time.m : time.m
  let hString = time.h < 10 ? '0' + time.h : time.h
  timerEl.innerText = `${hString}:${mString}:${sString}:${msString}`
}

function updateTime() {
  time.ms += 1

  if (time.ms >= 100) {
    time.s += 1
    time.ms = 0
  }
  if (time.s >= 60) {
    time.m += 1
    time.s = 0
  }
  if (time.m >= 60) {
    time.h += 1
    time.m = 0
  }
}

function startButton(state) {
  if (state) {
    startBtnEl.style.background = 'var(--fourth-color)'
    startBtnEl.style.color = 'var(--first-color)'
  }
  if (!state) {
    startBtnEl.style.background = 'initial'
    startBtnEl.style.color = 'var(--fourth-color)'
  }
}

function stopButton(state) {
  if (state) stopBtnEl.removeAttribute('disabled')
  if (!state) stopBtnEl.setAttribute('disabled', true)
}

function thirdButton(state) {
  if (state)
    thirdBtnEl.removeAttribute('disabled')
  if (!state)
    thirdBtnEl.setAttribute('disabled', true)
}

function switchFirstButton(state) {
  if (state) {
    startBtnEl.innerText = "Resume"
  }
  if (state == "running") {
    startBtnEl.innerText = "Running"
  }
  if (!state) {
    startBtnEl.innerText = "Start"
  }
}

function switchThirdButton() {
  if (areRunning)
    thirdBtnEl.innerText = "Lap"
  if (!areRunning)
    thirdBtnEl.innerText = "Reset"
}