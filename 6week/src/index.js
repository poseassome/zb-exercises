import Character from "./classes/Character.js";
import { JOB, ABILITY } from "./data.js";

const $characterImage = document.querySelector(".image");
const $characterIntroduction = document.querySelector(".introduction");
const $hairRangeInput = document.querySelector(".hair input");
const $bodyRangeInput = document.querySelector(".body input");
const $jobSelect = document.querySelector(".job select");
const $jobActionButton = document.querySelector(".job button");
const $abilitySelect = document.querySelector(".ability select");
const $abilityActionButton = document.querySelector(".ability button");

const character = new Character({
  job: "PROGRAMMER",
  ability: "TAUNT",
});

$hairRangeInput.addEventListener("change", (event) => {
  character.changeHair(event.target.valueAsNumber);
  renderCharacter();
});

$bodyRangeInput.addEventListener("change", (event) => {
  character.changeBody(event.target.valueAsNumber);
  renderCharacter();
});

$jobSelect.addEventListener("change", (event) => {
  character.changeJob(event.target.value);
  renderCharacter();
});

$abilitySelect.addEventListener("change", (event) => {
  character.changeAbility(event.target.value);
  renderCharacter();
});

$jobActionButton.addEventListener('click', () => {
  character.showOff();
})
$abilityActionButton.addEventListener('click', () => {
  character.showSkill();
})

function getCharacterImage(hair, body) {
  return `images/hair-${hair}_body-${body}.png`;
}

function renderCharacterInterface() {
  const jobOptionsTemplate = Object.keys(JOB)
    .map((jobName) => `<option value=${jobName}>${JOB[jobName]}</option>`)
    .join("");

  const abilityOptionsTemplate = Object.keys(ABILITY)
    .map(
      (abilityName) =>
        `<option value=${abilityName}>${ABILITY[abilityName]}</option>`
    )
    .join("");

  $jobSelect.innerHTML = jobOptionsTemplate;
  $abilitySelect.innerHTML = abilityOptionsTemplate;
}

function renderCharacter() {
  renderCharacterIntroduction();
  renderCharacterImage();
}

function renderCharacterIntroduction() {
  $characterIntroduction.innerText = character.introduction;
}

function renderCharacterImage() {
  $characterImage.src = getCharacterImage(character.hair, character.body);
}

renderCharacter();
renderCharacterInterface();
