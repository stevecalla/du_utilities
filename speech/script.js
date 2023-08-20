const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputTxt = document.querySelector(".txt");
const voiceSelect = document.querySelector("select");

const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector(".pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector(".rate-value");

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();

    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });

  const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-name", voices[i].name);
    option.setAttribute("data-lang", voices[i].lang);
    voiceSelect.appendChild(option);
  }
  
  voiceSelect.selectedIndex = selectedIndex;
  // console.log(voiceSelect.selectedIndex);
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  if (inputTxt.value !== "") {
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);

    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");

    console.log(voiceSelect); //select element with all the voice options
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedOptions
    console.log(voiceSelect.selectedOptions); //the selected voice option
    console.log(voiceSelect.selectedOptions[0].getAttribute("data-name"));
    console.log(selectedOption);

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = function (event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
};

pitch.onchange = function () {
  pitchValue.textContent = pitch.value;
};

rate.onchange = function () {
  rateValue.textContent = rate.value;
};

//this function will speak when voice is selected if enabled
voiceSelect.onchange = function () {
  // speak(); 
};

// const speechButton = document.getElementById('speechButton');
// const speechInput = document.getElementById('speechInput');

// speechButton.addEventListener('click', speechHandler);
// // speechInput.addEventListener('click', speak);

// function speechHandler() {
//   console.log('my name is inigo montoya, ' + 'i love apples ' + ' prepare to feast');
//   let msg = 'my name is inigo montoya,' + 'i love apples' + 'prepart to feast';

//   const sp = new SpeechSynthesisUtterance(msg);
//   [sp.voice] = speechSynthesis.getVoices();
//   speechSynthesis.speak(sp);
// }

// speak('my name is inigo montoya,' + 'i love apples' + 'prepart to feast');

//place code in chrome browser console
//or build a website then add this functionality