let getNotification = document.querySelector(".notification");
let wifieIcon = document.querySelector("i");
let connection = document.querySelector("h4");
let description = document.querySelector(".description");
let btn = document.querySelector("button");

let onLine = true,
  intervalId,
  timer = 10;

const checkConnection = async () => {
  try {
    const responce = await fetch("https://jsonplaceholder.typicode.com/posts");
    onLine = responce.status <= 200 && responce.status < 300;
  } catch (error) {
    onLine = false;
  }
  timer = 10;
  clearInterval(intervalId);
  handleNotification(onLine);
};

const handleNotification = (status) => {
  if (status) {
    wifieIcon.className = "bi bi-wifi";
    connection.innerText = "Restored Connection";
    description.innerText =
      "Your network is now successfully connected to the internet";
    getNotification.classList.add("online");
    return setTimeout(() => getNotification.classList.remove("show"), 3000);
  }
  wifieIcon.className = "bi bi-wifi-off";
  connection.innerText = "Loss Connection";
  description.innerHTML =
    "Your Network is unavailable, we will attempt to reconnect you in <b>9</b> second";
  //   getNotification.classList.add("show");
  getNotification.className = "notification show";

  intervalId = setInterval(() => {
    timer--;

    if (timer === 0) checkConnection();
    getNotification.querySelector(".description b").innerHTML = timer;
  }, 1000);
};

setInterval(() => onLine && checkConnection(), 4000);
