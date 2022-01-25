(() => {
  ("use strict");

  const get = (element) => document.querySelector(element);

  class GameData {
    constructor() {
      this.$board = get(".board");
      this.$scores = get(".scores");
      this.$moves = get(".moves");
      this.cards = [
        "star",
        "paper-plane",
        "snowflake",
        "thumbs-up",
        "user",
        "lemon",
        "heart",
        "bell",
        "moon",
        "sun"
      ];
      this.cardList = this.setCards([...this.cards, ...this.cards]);
      this.moves = 0;
      this.scores = 0;
      this.limit = 50;
      this.total = this.cards.length;
      this.current = [];
    }

    setCards(cardlist) {
      for (let index = 0; index < cardlist.length; index++) {
        // 1번 문제
        let copyIndex = Math.floor(Math.random() * index);
        [cardlist[copyIndex], cardlist[index]] = [
          cardlist[index],
          cardlist[copyIndex]
        ];
      }
      return cardlist;
    }

    getCards() {
      return this.cardList;
    }

    addMove() {
      return this.moves++;
    }

    addScore() {
      return this.scores++;
    }

    updatePoint() {
      this.$scores.textContent = this.scores;
      this.$moves.textContent = this.moves;
    }

    resetPoint() {
      this.$scores.textContent = 0;
      this.$moves.textContent = 0;
    }

    resetGame() {
      // 2번 문제
      this.moves = 0;
      this.scores = 0;
      this.cardList = this.setCards([...this.cards, ...this.cards]);
    }

    setGame() {
      this.$board.innerHTML = "";
      let temp = document.createDocumentFragment();
      for (let index = 0; index < this.getCards().length; index++) {
        let card = document.createElement("li");
        let front = document.createElement("span");
        let icon = document.createElement("i");
        card.classList.add("card");
        front.classList.add("front");
        icon.setAttribute("class", `icon far fa-${this.getCards()[index]}`);
        // 3번 문제
        card.append(front);
        card.append(icon);
        temp.append(card);
      }
      this.$board.append(temp);
    }

    isEnd() {
      // 4번 문제
      if (this.scores === this.total) {
        return "win";
      }
      if (this.limit <= this.moves) {
        return "defeat";
      }
    }
  }

  const checkCard = (cards) => {
    game.current = [];
    if ("defeat" === game.isEnd()) {
      alert("패배!");
      setTimeout(() => {
        // 5번 문제
        game.resetGame();
        game.resetPoint();
        game.setGame();
      }, 1000 * 1);
    }
    if (cards[0].children[1].className !== cards[1].children[1].className) {
      closeCards(cards);
      return;
    }
    game.addScore();
    game.updatePoint();
    correctCards(cards);
    if ("win" === game.isEnd()) {
      alert("승리!");
    }
  };

  // 6번 문제
  const correctCards = (cards) => {
    cards.forEach(($element) => $element.classList.add("match"));
  };

  const closeCards = (cards) =>
    cards.forEach(($element) => {
      $element.classList.add("notmatch");
      setTimeout(() => {
        $element.setAttribute("class", "card");
      }, 1000 * 0.5);
    });

  const startGame = (event) => {
    event.target.textContent = "다시 시작";
    game.current = [];
    game.resetGame();
    game.resetPoint();
    game.setGame();
  };

  const playGame = (event) => {
    let $target = event.target;
    if (!$target.classList.contains("card")) {
      return;
    }
    $target.classList.add("flip");
    game.current.push($target);
    game.addMove();
    game.updatePoint();
    $target.removeEventListener("click", playGame, false);
    if (game.current.length < 2) {
      return;
    }
    checkCard(game.current);
  };

  const game = new GameData();
  get(".js-play").addEventListener("click", startGame);
  get(".limit").textContent = game.limit;
  game.$board.addEventListener("click", playGame);
})();
