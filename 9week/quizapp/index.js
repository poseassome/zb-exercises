(() => {
  ("use strict");

  const get = (element) => document.querySelector(element);

  const data = [
    {
      question:
        "1. canvas의 context를 사용하여 전체 화면을 지우기 위해서 사용하는 구문 중 알맞은 것은?",
      options: [
        "context.clear(0, 0, canvas.width, canvas.height);",
        "context.clear(0, 9999, canvas.width, canvas.height);",
        "context.clearRect(0, 9999, canvas.width, canvas.height);",
        "context.clearRect(0, 0, canvas.width, canvas.height);"
      ],
      answer: "context.clearRect(0, 0, canvas.width, canvas.height);"
    },

    {
      question: "2. constructor의 뜻은?",
      options: [
        "Class의 객체들을 외부로 리턴하기 위한 클로저 함수입니다.",
        "Class의 인스턴스 객체를 생성하고 초기화하는 메서드입니다.",
        "Class를 자식 인스턴스로 두고 사용하는 메서드입니다.",
        "Class를 부모 인스턴스로 두는 전역함수입니다."
      ],
      answer: "Class의 인스턴스 객체를 생성하고 초기화하는 메서드입니다."
    },

    {
      question: '3. const result = (2 + 3 + "5"); 이 코드의 결과 값은?',
      options: ["10", "235", "55", "28"],
      answer: "55"
    },

    {
      question: "4. 다음 중 참조타입의 변수인 것은?",
      options: [
        "const newVar = [];",
        "const newVar = 10;",
        'const newVar = "하이"',
        'const newVar = ""'
      ],
      answer: "const newVar = [];"
    },

    {
      question:
        "5. 다음중 캔버스를 사용하여 사각형을 그릴 때 사용하는 메서드는?",
      options: [
        "ctx.Rectangle(25,25,100,100)",
        "ctx.recTangle(25,25,100,100)",
        "ctx.fillRect(25,25,100,100)",
        "ctx.clearRect(25,25,100,100)"
      ],
      answer: "ctx.fillRect(25,25,100,100)"
    }
  ];

  class QuizApp {
    constructor() {
      this.questions = data;
      this.limit = 10;
      this.score = 0;
      this.time = 0;
      this.line = 0;
      this.number = 1;
      this.count = 0;
      this.$start = get(".js-start");
      this.$restart = get(".js-restart");
      this.$next = get(".js-next");
      this.$quizBox = get(".quiz_box");
      this.$resultBox = get(".result_box");
      this.$title = get(".quiz_question");
      this.$options = get(".options");
      this.$quizCount = get(".totals");
      this.$scores = get(".scores");
      this.$time = get(".time");
      this.$line = get(".line");
      this.timer = "";
      this.liner = "";
      this.events();
    }

    events() {
      this.$start.onclick = () => this.gameStart();
      this.$restart.onclick = () => this.gameStart();
      this.$next.onclick = () => {
        if (this.questions.length - 1 <= this.count) {
          this.getResult();
          return;
        }
        this.count++;
        this.number++;
        this.gameOptions();
        this.$next.classList.remove("active");
      };
    }

    gameOptions() {
      this.limit = 10;
      this.time = 0;
      this.line = 0;
      this.getQuestion();
      this.getQuestionCounter();
      this.setTime();
      this.setLine();
    }

    gameStart() {
      // 1번문제
      // 퀴즈 시작할 시에 필요한 동작들을 구현해보세요.
      if (this.$resultBox.classList.contains("active")) {
        this.$resultBox.classList.remove("active");
      }
      this.score = 0;
      this.number = 1;
      this.count = 0;
      this.gameOptions();
      this.$start.remove();
      this.$quizBox.classList.add("active");
    }

    checkCorrect(text) {
      // 2번문제
      // 파라미터로 들어오는 text를 검증해서 true 또는 false를 리턴해보세요.
      if (this.questions[this.count].answer === text) {
        return true;
      } else {
        return false;
      }
    }

    getSelected($this) {
      // 3번문제
      // 시간이 다 지나기 전에 선택했다면 어떤 작업들을 해주어야 할까요?
      // 한번 완성해보세요!
      this.setAllDisabled();
      this.line = 100;
      this.limit = 0;
      if (!this.checkCorrect($this.textContent)) {
        $this.classList.add("incorrect");
      } else {
        this.score++;
      }
    }

    setAllDisabled() {
      // 4번문제
      // 모든 option들에 disabled라는 클래스를 부여해보세요.
      // 정답이 맞다면 correct라는 클래스를 부여해보세요.
      this.$options.querySelectorAll(".option").forEach(($elm) => {
        if (this.checkCorrect($elm.textContent)) {
          $elm.classList.add("correct");
        }
        $elm.classList.add("disabled");
      });
    }

    setFailed() {
      this.setAllDisabled();
      this.$next.classList.add("active");
    }

    getResult() {
      this.$quizBox.classList.remove("active");
      this.$resultBox.classList.add("active");
      let point = "";
      if (this.score === this.questions.length) {
        point = "만점!!!";
      } else {
        point = `${this.score}점`;
      }
      this.$scores.innerHTML = point;
    }

    getQuestion() {
      this.$title.innerHTML = "";
      this.$options.innerHTML = "";
      this.$title.innerHTML = this.questions[this.count].question;
      // 5번문제
      // 각각의 옵션들을 this.questions의 options 배열들을 순회하며 할당해보세요.
      for (let $item of this.questions[this.count].options) {
        let $option = document.createElement("div");
        $option.innerText = $item;
        $option.classList.add("option");
        $option.addEventListener("click", (e) => {
          this.getSelected(e.target);
        });
        this.$options.appendChild($option);
      }
    }

    getQuestionCounter() {
      this.$quizCount.innerHTML = `${this.questions.length}문제 중에 ${
        this.count + 1
      }문제`;
    }

    setTime() {
      this.$time.innerHTML = this.limit--;
      if (this.limit < this.time) {
        cancelAnimationFrame(this.timer);
        this.setFailed();
      } else {
        this.timer = requestAnimationFrame(() => {
          setTimeout(this.setTime.bind(this), 1000 * 1);
        });
      }
    }

    setLine() {
      this.$line.style.transform = `translate3d(${(this.line += 0.166)}%, 0, 0)`;
      // 6번문제
      // 위의 setTime() 메서드를 참고하여, setLine() 메서드는 언제까지 동작해야할지 완성해보세요.
      if (100 < this.line) {
        cancelAnimationFrame(this.liner);
      } else {
        this.liner = requestAnimationFrame(this.setLine.bind(this));
      }
    }
  }

  new QuizApp();
})();
