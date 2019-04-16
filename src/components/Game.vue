<template>
  <div class="hello">
    <p>Current best attempt is: {{ topScore.duration }} by {{ topScore.name }}</p>
    <div class="container">
      <div class="cards">
        <div class="card cardFlip" v-for="card in cards" :key="card._id" :class="cardClasses[card.name]"
            @click="flipCard(card)">
            <div v-if="!card.flipped">
                <div class="back"></div>
            </div>
            <div v-else>
                <div class="front" :style="{ backgroundImage: 'url(' + card.image + ')' }"></div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      topScore: 0,
      cards: Array,
      turns: 0,
      disableClick: false,
      matchedPairs: 0,
      prevCardIndex: -1,
      secondFlip: false,
      duation: 0,
    }
  },
  methods: {
    flipCard(card) {
			if (this.turns == 0)
				this.timer();
			//is second flip
			if (card === this.cards[this.prevCardIndex]) {
				console.log("Pick a different card.");
				return;
			}
			if (this.disableClick) {
				console.log("click not allowed yet");
				return;
			}
			card.flipped = true;
			if (this.secondFlip) {
				this.disableClick = true;
				setTimeout(() => {
					if (this.checkMatch(this.cards[this.prevCardIndex], card)) {
						this.matchedPairs++;
						this.cards[this.prevCardIndex].found = true;
						card.found = true;
						console.log("cards match!");
          } else {
						card.flipped = false;
						this.cards[this.prevCardIndex].flipped = false;
						console.log("cards don't match");
          }
          
					this.secondFlip = false;
          this.disableClick = false;
          
					if (this.matchedPairs == this.cards.length / 2) {
						this.endGame();
					}
				}, 1000);
			} else {
				this.prevCardIndex = this.cards.indexOf(card);
				this.secondFlip = true;
			}

			this.turns++;
		},
		checkMatch(firstCard, secondCard) {
			return ((firstCard.name === secondCard.name) ? true : false);
		},
		endGame() {
			this.gameOver = true;
			alert(`You Won! You completed the game in: ${ this.duration } seconds`);
      let data = new Object();
      data.turns = this.turns,
      data.duration = this.duration,
      data.date = Date(),
      this.$emit('gameFinished',data);
      this.$router.push('Leaderboard');
		},
		incrementTime() {
			this.duration++;
			this.timer();
		},
		timer() {
			setTimeout(this.incrementTime, 1000);
    },
  },
  async created() {
    await this.$store.dispatch("getCards");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
