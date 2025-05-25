function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
function todoList() {
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    localStorage.setItem("currentTask", currentTask);
  }

  function renderTask() {
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    let allTask = document.querySelector(".allTask");
    let sum = ` `;

    currentTask.forEach((elem, idx) => {
      sum += `  <div class="task">
              <h5>${elem.task} <span class="${elem.imp}">Imp</span></h5>
              <details class="details-box">
                <summary>
                  See details
                </summary>
                <p>${elem.details}</p>
              </details>
              <button id=${idx}>Mark as completed</button>
            </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }

  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });

    renderTask();

    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckbox.checked = false;
  });
}

function dailyPlanner() {
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  let dayPlanner = document.querySelector(".day-planner");

  let hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  let wholeDaySum = ``;
  hours.forEach((hour, idx) => {
    let savedData = dayPlanData[idx] || "";

    wholeDaySum += `          <div class="day-planner-time">
            <p>${hour}</p>
            <input id=${idx}  type="text" placeholder="..." value=${savedData}>
          </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  let dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach((input) => {
    input.addEventListener("input", () => {
      dayPlanData[input.id] = input.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

function motivationalQuote() {
  let motivationQuoteContent = document.querySelector(".motivation-two h1");
  let motivationAuthor = document.querySelector(".motivation-three h2");
  let apiKey = "3+ZdFSC9rpsLRxusv5RSOA==Wgz95kp93Juy4bla";

  function getQuote() {
    return fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": apiKey,
      },
    }).then((raw) => {
      if (!raw.ok) {
        throw new Error("Something went wrong.");
      }
      return raw.json();
    });
  }

  getQuote().then((data) => {
    motivationQuoteContent.innerHTML = data[0].quote;
    motivationAuthor.innerHTML = data[0].author;
  });
}

function pomodoroTimer() {
  let totalSeconds = 1500;
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".start-timer");
  let pauseBtn = document.querySelector(".pause-timer");
  let resetBtn = document.querySelector(".reset-timer");
  let timerInterval = null;
  let isWorkSession = true;
  let session = document.querySelector(".pomodoro-fullpage .session");

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padEnd(2, "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);
    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Break";
          session.style.backgroundColor = "blue";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "lightseagreen";
          totalSeconds = 25 * 60;
        }
      }, 10);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timerInterval);
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}

function dailyGoals() {
  let form = document.querySelector(".daily-goals-fullpage .addGoal form");
  let goalInput = form.querySelector("input");
  let goalDetailsInput = form.querySelector("textarea");
  let goalCheckbox = form.querySelector("#goal-check");

  let currentGoals = [];

  if (localStorage.getItem("currentGoals")) {
    currentGoals = JSON.parse(localStorage.getItem("currentGoals"));
  } else {
    localStorage.setItem("currentGoals", JSON.stringify(currentGoals));
  }

  function renderGoals() {
    localStorage.setItem("currentGoals", JSON.stringify(currentGoals));

    let allGoals = document.querySelector(".daily-goals-fullpage .allGoals");
    let output = "";

    currentGoals.forEach((goal, idx) => {
      output += `
        <div class="task sticky-note">
          <h5>${goal.task}<span class="${goal.imp}">Imp</span></h5>
          <details class="details-box">
            <summary>See details</summary>
            <p>${goal.details}</p>
          </details>
          <button id="${idx}">Mark as completed</button>
        </div>
      `;
    });

    allGoals.innerHTML = output;

    document
      .querySelectorAll(".daily-goals-fullpage .allGoals .task button")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          currentGoals.splice(btn.id, 1);
          renderGoals();
        });
      });
  }

  renderGoals();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentGoals.push({
      task: goalInput.value,
      details: goalDetailsInput.value,
      imp: goalCheckbox.checked ? "true" : "false",
    });

    renderGoals();

    goalInput.value = "";
    goalDetailsInput.value = "";
    goalCheckbox.checked = false;
  });
}

function weatherAPI() {
  let data = null;
  let header = document.querySelector(".allElems header");
  let headerTime = document.querySelector(".header1 h1");
  let headerDate = document.querySelector(".header1 h2");
  let header2Temp = document.querySelector(".header2 h2");
  let header2Condition = document.querySelector(".header2 h4");
  let header2Precipitation = document.querySelector(".header2 .precipitation");
  let header2Humidity = document.querySelector(".header2 .humidity");
  let header2Wind = document.querySelector(".header2 .wind");

  async function weatherAPICall() {
    let res = await fetch(
      `http://api.weatherstack.com/current?access_key=b32d87a20454956f539c273b3b85ff08&query=Bharuch`
    );
    data = await res.json();

    header2Temp.innerHTML = `${data.current.temperature}°C`;
    header2Condition.innerHTML = `${data.current.weather_descriptions[0]}`;
    header2Precipitation.innerHTML = `Precipitation: ${data.current.precip}%`;
    header2Humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    header2Wind.innerHTML = `Wind: ${data.current.wind_speed}km/h `;
  }

  weatherAPICall();

  function timeDate() {
    let totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let totalMonthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let dayOfWeek = totalDaysOfWeek[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let dateD = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    headerDate.innerHTML = `${dateD} ${totalMonthsOfYear[month]} ${year}`;
    let hours12 = hours % 12 || 12;
    headerTime.innerHTML = `${dayOfWeek}, ${String(hours12).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )} ${hours > 12 ? "PM" : "AM"}`;

    if (hours > 12) {
      header.style.backgroundImage =
        "url(https://images.unsplash.com/photo-1591552265137-99c59d9f4927?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
      header.querySelectorAll("*").forEach((elem) => {
        elem.style.color = "white";
      });
    }
  }

  setInterval(() => {
    timeDate();
  }, 1000);
}

function changeTheme() {
  let rootElement = document.documentElement;
  let theme = document.querySelector(".theme");
  let flag = 0;

  theme.addEventListener("click", function () {
    if (flag === 0) {
      rootElement.style.setProperty("--pri", "#F8F4E1");
      rootElement.style.setProperty("--sec", "#222831");
      rootElement.style.setProperty("--ter1", "#948979");
      rootElement.style.setProperty("--ter2", "#393E46");
      flag = 1;
    } else if (flag === 1) {
      rootElement.style.setProperty("--pri", "#E8F0FE");
      rootElement.style.setProperty("--sec", "#1A1A2E");
      rootElement.style.setProperty("--ter1", "#6D9886");
      rootElement.style.setProperty("--ter2", "#393646");
      flag = 2;
    } else if (flag == 2) {
      rootElement.style.setProperty("--pri", "#0f172a");
      rootElement.style.setProperty("--sec", "#f8fafc");
      rootElement.style.setProperty("--ter1", "#cbd5e1");
      rootElement.style.setProperty("--ter2", "#e2e8f0");
      flag = 0;
    }
  });
}

openFeatures();
todoList();
dailyPlanner();
motivationalQuote();
pomodoroTimer();
dailyGoals();
weatherAPI();
changeTheme();
