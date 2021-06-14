// const {ipcRenderer} = require("electron");
const F = require("fnct");
const fs = require("fs");
const path = require("path");

var doHack;
var otherLoad = false;
var ipt;
var ipp;
var wifin;
var wifip;
async function start() {
  if (!otherLoad) {
    ipt = doc.id("ipt").value || "[ip-t_NUL]";
    ipp = doc.id("ipp").value || "[ip-p_NUL]";
    wifin = doc.id("wifin").value || "[connect_NUL]";
    wifip = doc.id("wifip").value || "[pass_NUL]";
  }
  doHack = true;

  doc.html.innerHTML = fs.readFileSync(path.join(__dirname, "hack.html")).toString();
  onkeydown = async function (e) {
    if (!doHack) {
      return;
    }
    if (
      e.ctrlKey
      || e.altKey
      || e.metaKey
    ) {
      return;
    }
    doHack = false;
    doc.id("content").innerHTML = `
      <error>ERROR: Invalid Keyboard Event {${e.keyCode || "NUL"}}</error>
    `;
    await F.sleep(F.randomFloat(1, 2));
    doc.id("content").innerHTML += `
      <br>
      <warn>Restarting...</warn>
    `;
    await F.sleep(F.randomFloat(1, 3));
    doHack = true;
    doc.id("content").innerHTML = "";
    otherLoad = true;
    start();
  }

  pw = "&#x2022;".repeat(wifip.length);
  port = F.randomInt(0, 9999).toString().fill(4);
  lines = `
    init self
    Initialized program 'self' TYPE:C9
    ipconfig join localhost://${ipp}:${port}
    Issued private IP network 'self' '${ipp}' on port /:${port}
    ipconfig connect -x --mname=TRUE
    Connected to victim IP address '${ipt}'
    net access --wireless ${wifin}
    Accessed Wifi network '${wifin}'
    net log.in %PW%[${wifip}] else ERROR
    Logged in with KeyPass ${pw}
    iptorrent terminate ${ipt} --no-mercy
    <error>ERROR: IP Address '${ipt}' is invalid</error>
    error handle --invalid[ip]
    Exiting with CODE:0
  `.split("\n");

  if (!doHack) {
    return;
  }
  await F.sleep(F.randomFloat(0.8, 1.2));
  if (!doHack) {
    return;
  }
  for (var i = 1; i < lines.length - 1; i += 2) {
    if (!doHack) {
      break;
    }
    if (i > 1) {
      doc.id("content").innerHTML += "<br><br>";
    }
    doc.id("content").innerHTML += "C:\\Admin>{0}".format(lines[i]);
    await F.sleep(F.randomFloat(1, 3));

    if (!doHack) {
      break;
    }
    doc.id("content").innerHTML += "<br><br>&gt;&gt; {0}".format(lines[i + 1]);
    await F.sleep(F.randomFloat(3, 6));
  }
  if (!doHack) {
    return;
  }
  await F.sleep(1);

  if (!doHack) {
    return;
  }
  window.close();
}