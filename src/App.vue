
<template>
<div class="app">
    <img src="./assets/images/peek-a-vue-title.png" alt="" class="icon-img">
    <section class="description">
      <p>Wellcome to Peek A Vue!</p>
      <p>A Card matching game powered by vue.js!</p>
    </section>
      <transition-group  tag="section" 
      class="game-board"
      name="shuffle-card">
      <Card
        v-for="card in cardList"
        :key="`${card.value}-${card.variant}`"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        :matched="card.matched"
        @selectCardClicked="filpCard"
      />
    </transition-group>
    <h2 class="status">{{ status }}</h2>
  <button 
   @click="startGame"
    class="button"
    v-if="newPlayer"
    >
    <img src="./assets/images/play.svg"/>Start Game
   </button>
    <button v-else 
    @click="restartGame" class="button"><img src="./assets/images/restart.svg"/>Restart Game</button>

</div>

</template>






<script setup>
import _ from "loadsh";
import Card from "./components/Card.vue";
import { ref, watch, computed } from "vue";
import  {launchConfetti}  from './utilites/confetti'


//#region ref
const cardList = ref([]);
const userSelection = ref([]);
const newPlayer=ref(true)

const startGame=()=>{
  newPlayer.value=false;
  restartGame()
}


const cardItems = [
  'bat',
  'candy',
  "cauldron",
  'cupcake',
  'ghost',
  'moon',
  'pumpkin',
  'witch-hat',
];

cardItems.forEach((item) => {
  cardList.value.push({
    value: item,
    variant:1,
    visible: false,
    position: null,
    matched: false,
  });

  cardList.value.push({
    value: item,
    variant:2,
    visible: true,
    position: null,
    matched: false,
  });
});

cardList.value = cardList.value.map((card, index) => {
  return {
    ...card,
    position: index,
  };
});

//#endregion

const status = computed(() => {
  if (remainingPairs.value === 0) {
    return "Player Win!!!";
  } else {
    return `Remaining Pairs:${remainingPairs.value}`;
  }
});

const remainingPairs = computed(() => {
  const reaminingCards = cardList.value.filter(
    (card) => card.matched === false
  ).length;
  return Math.round(reaminingCards / 2);
});

// https://lodash.com/docs/#shuffle
// _.shuffle([1, 2, 3, 4]);
// // => [4, 1, 3, 2]


const restartGame = () => {
  cardList.value = _.shuffle(cardList.value);
  cardList.value = cardList.value.map((card, index) => {
    return {
      ...card,
      matched: false,
      position: index,
      visible: false,
    };
  });
};

const filpCard = (payload) => {
  cardList.value[payload.position].visible = true;
  if (userSelection.value[0]) {
    if (
      userSelection.value[0].position === payload.position &&
      userSelection.value[0].faceValue == payload.faceValue
    ) {
      return;
    } else {
      return (userSelection.value[1] = payload);
    }
  }

  return (userSelection.value[0] = payload);
};

const statusResult = (cardOne, cardTwo) => {
  if (cardOne.faceValue === cardTwo.faceValue) {
    // status.value='Matched!'
    cardList.value[cardOne.position].matched = true;
    cardList.value[cardTwo.position].matched = true;
  } else {
    // status.value='Mismatch!'
    setTimeout(() => {
      cardList.value[cardOne.position].visible = false;
      cardList.value[cardTwo.position].visible = false;
      userSelection.value.length = 0;
    }, 500);
  }
};

watch(
  userSelection,
  (currentValue) => {
    if (currentValue.length === 2) {
      const cardOne = currentValue[0];
      const cardTwo = currentValue[1];
      statusResult(cardOne, cardTwo);
      userSelection.value.length = 0;
    }
  },
  { deep: true }
);

watch(remainingPairs,currentValue =>{
  if(currentValue === 0){
     launchConfetti()
  }
})
</script>

<style>

html,
body {
  margin: 0;
  padding: 0;

}

h1 {
  margin-top: 0;
}

.app{
  text-align: center;
  background-image: url(./assets/images/page-bg.png);
  color: #fff;
  background-color: #00070c;
  padding-top: 5px;
  height: 100vh;
  overflow: hidden;
 
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 120px);
  grid-template-rows: repeat(4, 120px);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  justify-content: center;

}

.container {

}
.status{
font-family: 'Titillium Web', sans-serif;
}
.icon-img{
  margin-bottom: 10px;
}

.button{
  background-color: orange;
  color: #fff;
  padding: 0.75rem 1rem;
  display: flex;
  margin: 0px auto;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-family: 'Titillium Web', sans-serif;
  font-weight: bold;
  font-size: 1.1rem;

}

.button img{
  padding-right: 10px;
  font-weight: bold;
}

.shuffle-card-move{
transition: transform 0.8s ease-in;
}
.description{
font-family: 'Titillium Web', sans-serif;
}

.description p{
margin: 0;
font-size: 1.2rem;
}

.description p:last-child{
margin-bottom: 30px;
}

</style>
