const WebSocket = require("ws");
let socket = new WebSocket("wss://cekirdektenyetisenler.kartaca.com/ws");

socket.on("message", function message(data) {
  console.log("received: %s", data);
  let keyy = String(data.slice(338, 402));
  let key = decrypt(keyy);
  socket.send(
    JSON.stringify({
      type: "REGISTER",
      name: "Enes",
      surname: "Guler",
      email: "enesguler149@gmail.com",
      registrationKey: `${key}`,
    })
  );

  socket.close();
});

function decrypt(m) {
  let arr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "z",
    "y",
    "x",
    "w",
    "v",
    "u",
    "t",
    "s",
    "r",
    "q",
    "p",
    "o",
    "n",
  ];
  let l = (arr.length - 1) / 2;
  let a = [];
  let b = [];
  for (i = 0; i < (arr.length - 1) / 2; i++) {
    a[i] = arr[i];
    b[i] = arr[l + 1];
    l++;
  }
  let me = m.split("");
  for (i = 0; i < me.length; i++) {
    for (j = 0; j < l; j++) {
      if (a[j] == me[i]) {
        me[i] = b[j];
        continue;
      } else if (b[j] == me[i]) {
        me[i] = a[j];
        continue;
      } else {
        continue;
      }
    }
  }
  return me.join("");
}
