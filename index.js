const timerEl = document.querySelector(".timer")
const startBtn = document.querySelector('.start')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
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

startBtn.onclick = () => {
  if (!areRunning) {
    interval = setInterval(function() {
      updateTime()
      renderTime()
    }, 1000 / 100)
    areRunning = true
  }
}
stopBtn.onclick = () => {
  clearInterval(interval)
  areRunning = false
}
resetBtn.onclick = () => {
  time = createTime()
  renderTime()
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