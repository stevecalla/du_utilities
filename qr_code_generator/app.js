let FUNCTION_API_URL =
  "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-10a937cb-1f12-427b-aadd-f43d0b08d64a/sample/qr";
let last = undefined;

function qr() {
  // const txt = $(".qr-input").val().trim();
  // console.log(document.querySelector('.qr-input').value);
  const txt = document.querySelector(".qr-input").value.trim();
  if (last != txt) {
    last = txt;
    let API = FUNCTION_API_URL;
    let src = API + "?text=" + escape(txt);
    console.log("sending", src);
    fetch(src)
      .then((response) => response.text())
      .then(console.log("status", status))
      .then((data) => {
        console.log(data);
        // $(".qr-code").html('<img width="200" src="' + data + '" />');
        // document.querySelector(".qr-code").html('<img width="200" src="' + data + '" />');
        // document.querySelector(".qr-code");
        displayQRCode(data);
      });
  }
}

function displayQRCode(data) {
  document.querySelector(".qr-code").innerHTML = `
    <img style="display: 
      block;-webkit-user-select: 
      none;margin: auto;
      background-color: hsl(0, 0%, 90%);
      transition: background-color 300ms;" 
      src="${data}">
      `;
}

document.getElementById("qrSubmit").addEventListener("click", function () {
  qr();
});
