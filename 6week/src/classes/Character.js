import { ABILITY, JOB } from "../data.js";
import Person from "./Person.js";

export default class Character extends Person {
  constructor({ job, ability, hair, body }) {
    super(hair, body);

    this.job = job || JOB.PROGRAMMER;
    this.ability = ability || ABILITY.RUN_FAST;

    this.changeJob(job);
    this.changeAbility(ability);
  }

  changeJob(job) {
    if (job in JOB) {
      this.job = job;
    }
  }

  changeAbility(ability) {
    if (ability in ABILITY) {
      this.ability = ability;
    }
  }

  get introduction() {
    return `
      내 직업은 '${JOB[this.job]}'이야. 
      특기는 '${ABILITY[this.ability]}'이지. 
      난 몸이 ${this.body} 한편이야. 
      그리고 머리스타일이 ${this.hair}하지.
    `;
  }

  showOff() {
    alert(`나는 최고의 ${this.job}이야!`);
  }

  showSkill() {
    alert(`간다! ${this.ability}!!`);
  }
}
