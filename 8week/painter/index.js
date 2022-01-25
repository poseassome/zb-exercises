(() => {
  ("use strict");

  const get = (element) => document.querySelector(element);
  class Painter {
    constructor() {
      this.mouseDown = false;
      this.canvas = get(".canvas");
      this.ctx = this.canvas.getContext("2d");
      this.pen = get(".js-penSize");
      this.colorPick = get(".js-colorPicker");
      this.erager = get(".js-erager");
      this.reset = get(".js-clear");
      this.size = this.pen.value;
      this.color = this.colorPick.value;

      this.events();
    }

    events() {
      this.colorPick.addEventListener(
        "change",
        (e) => (this.color = e.target.value)
      );

      this.pen.addEventListener("change", (e) => {
        this.setPen(e.target.value);
      });

      this.erager.addEventListener("click", () => this.setErager());

      this.reset.addEventListener("click", () => this.setReset());

      this.canvas.addEventListener("mousedown", (event) => {
        this.mouseDownHandler(this.canvas, event);
      });

      this.canvas.addEventListener("mousemove", (event) => {
        this.mouseMoveHandler(this.canvas, event);
      });

      this.canvas.addEventListener("mouseup", () => {
        this.mouseUpHandler();
      });
    }

    getMouse($canvas, event) {
      const paint = $canvas.getBoundingClientRect();
      return {
        x: event.clientX - paint.left,
        y: event.clientY - paint.top
      };
    }

    // 1번 문제
    setPen(size) {
      this.size = size;
      this.pen.previousElementSibling.innerHTML = `크기(${this.size})`;
    }

    // 2번 문제
    mouseDownHandler($canvas, event) {
      this.mouseDown = true;
      const currentPosition = this.getMouse($canvas, event);
      this.ctx.moveTo(currentPosition.x, currentPosition.y);
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.size;
      this.ctx.lineCap = "round";
    }

    // 3번 문제
    mouseMoveHandler($canvas, event) {
      if (!this.mouseDown) return;
      const currentPosition = this.getMouse($canvas, event);
      this.ctx.lineTo(currentPosition.x, currentPosition.y);
      this.ctx.stroke();
    }

    // 4번 문제
    mouseUpHandler() {
      this.mouseDown = false;
    }

    // 5번 문제
    setErager() {
      this.setPen(20);
      this.pen.value = this.size;
      this.color = "#fff";
    }

    // 6번 문제
    setReset() {
      this.ctx.fillStyle = "#fff";
      this.ctx.fillRect(0, 0, 600, 600);
      this.setPen(7);
      this.pen.value = this.size;
      this.color = "#000";
      this.colorPick.value = this.color;
    }
  }

  new Painter();
})();
