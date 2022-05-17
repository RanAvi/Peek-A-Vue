
<template>
  <div class="container">
    <h1>Peek-a-vue</h1>
    <section class="game-board">
      <Card 
      v-for="(card, index) in cardList"
      :key="`card-${index}`" 
      :value="card.value"
      :visible="card.visible"
       :position="card.position"
       :matched="card.matched"
       @selectCardClicked="filpCard"
       />
    </section>
  <h2>{{ status }}</h2>
  </div>
</template>

<script setup>
import Card from "./components/Card.vue";
import { ref,watch,computed } from 'vue'

//#region ref
const cardList = ref([]);
const userSelection = ref([]);

//#endregion

const status=computed(() =>{
    if(remainingPairs.value === 0){
       return 'Player Win!!!'
    }else{
      return `Remaining Pairs:${remainingPairs.value}`
    }

})


for (let i = 0; i < 16; i++) {
  cardList.value.push({
    value:8,
    visible:false,
    position:i,
    matched:false
  });
}


const remainingPairs= computed(() =>{
  const reaminingCards=cardList.value.filter
  (card =>card.matched===false).length
  return Math.round(reaminingCards/2);
  

})



const filpCard = (payload) =>{
  cardList.value[payload.position].visible=true;
  (userSelection.value[0])? userSelection.value[1]=payload : userSelection.value[0]=payload;
};


const statusResult=(cardOne,cardTwo)=>{
   if(cardOne.faceValue ===cardTwo.faceValue) {
       status.value='Matched!'
       cardList.value[cardOne.position].matched=true
       cardList.value[cardTwo.position].matched=true
   }else{
      status.value='Mismatch!'
      cardList.value[cardOne.position].visible=false
      cardList.value[cardTwo.position].visible=false
      userSelection.value.length=0
   }
  
}

watch(
  userSelection,
  (currentValue) =>{
  if(currentValue.length ===2){
    const cardOne=currentValue[0]
    const cardTwo=currentValue[1]
    statusResult(cardOne,cardTwo)
  }
},
 {deep:true}
)






</script>


<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}


.game-board {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  justify-content: center;
}

.container {
  text-align: center;
}
</style>
