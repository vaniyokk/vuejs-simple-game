let randomInt = function(start, end) {
    return Math.floor((Math.random() * end) + start);
}

new Vue({
  el: '#app',
  data: {
    youScore: 100,
    monsterScore: 100,
    isGameStarted: false,
    history: []
  },
  methods: {
    startGame() {
        this.history = [];
        this.isGameStarted = true;
        this.monsterScore = this.youScore = 100;
    },
    attack() {
        let damage = randomInt(3, 10);
        this.monsterScore -= damage;
        this.history.unshift({
            isPlayer: true,
            text: "User hit Monster by " + damage
        });
        if(this.checkWin()) {
            return;
        }
        this.monsterAttack();
    },
    specialAttack() {
        let damage = randomInt(10, 20);
        this.monsterScore -= damage;
        this.history.unshift({
            isPlayer: true,
            text: "User hit Monster hard by " + damage
        });
        if(this.checkWin()) {
            return;
        }
        this.monsterAttack();
    },
    heal() {
        if(this.youScore >= 90) {
            this.youScore = 100;
        } else {
            this.youScore += 10;
        }
        this.history.unshift({
            isPlayer: true,
            text: "User heals self up by " + 10
        });
        this.monsterAttack();
    },
    giveUp() {
        this.isGameStarted = false;
    },
    monsterAttack() {
        let damage = randomInt(3, 10);
        this.youScore -= damage;
        this.history.unshift({
            isPlayer: false,
            text: "Monster hit User by " + damage
        });
        this.checkWin()
    },
    checkWin: function() {
        if(this.youScore <= 0) {
            if(confirm('You game over! Play agin?')){
                this.startGame();
            } else {
                this.isGameStarted = false;
            }
            return true;
        } else if(this.monsterScore <= 0) {
            if(confirm('Monster game over! Play agin?')){
                this.startGame();
            } else {
                this.isGameStarted = false;
            }
            true;
        }
        return false;
    }
  }
});