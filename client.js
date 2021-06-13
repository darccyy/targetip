// const {ipcRenderer} = require("electron");
const F = require("fnct");
const fs = require("fs");
const path = require("path");

async function start() {
  ipt = doc.id("ipt").value;
  ipp = doc.id("ipp").value;
  wifin = doc.id("wifin").value;
  wifip = doc.id("wifip").value;

  if (ipt && ipp && wifin && wifip) {
    doc.html.innerHTML = fs.readFileSync(path.join(__dirname, "hack.html")).toString();

    pw = "&#x2022;".repeat(wifip.length);
    port = F.randomInt(0, 9999).toString().fill(4);

    time = [1, 3];
    // time = [];
    time1 = [3, 6];
    // time1 = [];
    arr = `
      init self
      Initialized program 'self' TYPE:C9
      ipconfig join localhost://${ipp}:${port}
      Issued private IP network 'self' ${ipp} on port ${port}
      ipconfig connect -x --mname=TRUE
      Connected to victim IP address ${ipt}
      net access --wireless ${wifin}
      Accessed Wifi network '${wifin}'
      net log.in %PW% else ERROR
      Logged in with ${pw}
      iptorrent terminate ${ipt} --no-mercy
      <span id="error">ERROR: IP Address '${ipt}' is invalid</span>
      error handle --invalid[ip]
      Exiting with CODE:0
  `.split("\n");

    await F.sleep(F.randomFloat(0.2, 1));
    for (i = 1; i < arr.length - 1; i += 2) {
      if (i > 1) {
        doc.id("content").innerHTML += "<br><br>";
      }
      doc.id("content").innerHTML += "C:\\Admin>{0}".format(arr[i]);
      await F.sleep(F.randomFloat(time1[0], time1[1]));

      doc.id("content").innerHTML += "<br><br>&gt;&gt; {0}".format(arr[i + 1]);
      await F.sleep(F.randomFloat(time[0], time[1]));
    }
    await F.sleep(1);

    window.close();
  }
}