<template>
  <div class="Master">
    <div style="margin-bottom: 2rem">
        <span class="label">Time Elapsed: </span>
        <span class="value">{{ duration }} seconds</span>
    </div>
    <div style="margin-bottom: 2rem">
        <span class="label">Turns: </span>
        <span class="value">{{ turns }}</span>
    </div>
    <div class="cards">
      <div class="card" v-for="card in cards" :key="card._id" @click="flipCard(card)">
          <div v-if="!card.flipped">
              <div class="back"></div>
          </div>
          <div v-else>
              <div class="front" :style="{ backgroundImage: 'url(' + card.image + ')' }"></div>
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
      duration: 0,
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
		async endGame() {
      this.gameOver = true;
			alert(`You Won! You completed the game in: ${ this.duration } seconds`);
      let data = new Object();
      if (this.user) {
        data.name = this.user.name;
        data.user = this.user;
      } else {
        data.name = "Guest";
        data.user = "Guest";
      }
      data.turns = this.turns;
      data.duration = this.duration;
      try {
        await this.$store.dispatch("finishGame", data);
        this.$router.push('Leaderboard');
      } catch (error) {
        console.log(error);
      }
      //this.$emit('gameFinished',data);
      
		},
		incrementTime() {
			this.duration++;
			this.timer();
		},
		timer() {
			setTimeout(this.incrementTime, 1000);
    },
    prepareCards() {
      this.cards = this.cards
      .concat(this.cards.map((card) => ({
        name: card.name + '',
        image: card.image + ''
      }))).sort(() => 0.5 - Math.random());

      this.cards.forEach((card) => {
				this.$set(card, 'flipped', false);
				this.$set(card, 'found', false);
			});
    }
  },
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  },
  async created() {
    await this.$store.dispatch("getCards");
    this.cards = this.$store.state.cards;
    this.prepareCards();
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

.cards {
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.card {
  height: 150px;
  width: 100px;
  margin: 1rem;
}

.front, .back {
  border-radius: 5px;
  /* position: absolute;
  left: 0; right: 0; top: 0; bottom: 0; */
  width: 100px;
  height: 150px;
  background-color: white;		
}

.back {
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/102308/card_backside.jpg');
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
}

.front {    
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center;			
}

</style>
