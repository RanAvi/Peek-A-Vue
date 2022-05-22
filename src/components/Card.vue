<template>
    <div class="card"
     :class="filppedStyles"
     @click="handleSelectedCard"
     >
        <div 
     
        v-if="visible" 
        class="card-face is-front">
            <img :src='`../../src/assets/images/${value}.png`' :alt="value">
            <img v-if="matched"
             src="../assets/images/checkmark.svg" 
             class="icon-checkmark"/>
        </div>
        <div v-else  class="card-face is-back">
        </div>
    </div>
</template>

<script setup>

import { computed } from 'vue';
const emit= defineEmits(['selectCardClicked'])


const filppedStyles=computed (() =>{
    if(props.visible){
        return 'is-filpped'
    }
})


const handleSelectedCard = () =>{
    emit('selectCardClicked',({
        position:props.position,
        faceValue:props.value,
        matched:props.matched
    }))

}



const props=defineProps({
    value:{
        type:String,
        required:true
    },
    visible:{
        type:Boolean,
        default:false
    },
    position:{
        type:Number,
        required:true
    },
    matched:{
        type:Boolean,
        default:false
    }

});



</script>

<style>
.card {
  position: relative;
  transition: 0.3s transform ease-in-out;
  transform-style: preserve-3d;
}
.card.is-filpped{
    transform: rotateY(180deg);
}

.card-face{
    width:100%;
    height:100%;
    position: absolute;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden; 
}
.card-face.is-front{
    background-image: url(../assets/images/card-bg.png);
    color: #fff;
    position: relative;
    transform: rotateY(180deg);

}

.card-face.is-back{
    background-image: url(../assets/images/card-bg-empty.png);
    color:#fff;

  
}
.icon-checkmark{
   position:absolute ; 
   bottom: 10px;
   right: 10px;
}
</style>


