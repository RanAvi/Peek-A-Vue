<template>
    <div class="card"
     @click="handleSelectedCard"
     >
        <div 
        v-if="visible" 
        class="card-face is-front">
             {{ value }}
        </div>
        <div v-else class="card-face is-back">
            back
        </div>
       

    </div>
</template>

<script setup>


const emit= defineEmits(['selectCardClicked'])


const handleSelectedCard = () =>{
    emit('selectCardClicked',props.position)

}



const props=defineProps({
    value:{
        type:Number,
        required:true
    },
    visible:{
        type:Boolean,
        default:false
    },
    position:{
        type:Number,
        required:true
    }

});



</script>

<style>
.card {
  border: 5px solid #ccc;
  position: relative;
}

.card-face{
    width:100%;
    height:100%;
    position: absolute;
}
.card-face.is-front{
    background-color: red;
    color: #fff;

}

.card-face.is-back{
    background-color: blue;
    color:#fff;
}
</style>


