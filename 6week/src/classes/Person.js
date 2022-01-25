import { BODIES, HAIRS } from "../data.js";

export default class Person {
  constructor(hairIndex, bodyIndex) {
    this.hairIndex = hairIndex || 0;
    this.bodyIndex = bodyIndex || 0;

    this.changeHair(hairIndex);
    this.changeBody(bodyIndex);
  }

  changeHair(index) {
    if (index >= HAIRS.length) {
      this.hairIndex = HAIRS.length - 1;
      return;
    }

    if (index < 0 || index === undefined) {
      this.hairIndex = 0;

      return;
    }

    this.hairIndex = index;
  }

  changeBody(index) {
    if (index >= BODIES.length) {
      this.bodyIndex = BODIES.length - 1;

      return;
    }

    if (index < 0 || index === undefined) {
      this.bodyIndex = 0;

      return;
    }

    this.bodyIndex = index;
  }

  get hair() {
    return HAIRS[this.hairIndex];
  }

  get body() {
    return BODIES[this.bodyIndex];
  }
}
