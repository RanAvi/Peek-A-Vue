
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
       @selectCardClicked="filpCard"
       />
    </section>
  </div>
</template>

<script setup>
import Card from "./components/Card.vue";
import { ref } from 'vue'


const cardList = ref([]);
for (let i = 0; i < 16; i++) {
  cardList.value.push({
    value:i,
    visible:false,
    position:i
  });


}


const filpCard = (position) =>{
  cardList.value[position].visible=true
  console.log(position)
};







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
