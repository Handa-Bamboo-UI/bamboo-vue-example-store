<template>
  <div class="countTo">
    <div class="number">
      <span class="text-3xl font-bold text-gray-500">{{data.number.toFixed(0)}}</span>
    </div>
  </div>
</template>
<script setup type="ts">
import gsap from 'gsap'
import { reactive,watch ,defineProps} from 'vue'
const props=defineProps({
  value:{
    type:Number,
    default:0
  }
})
const data=reactive({
  number:0
}) 
function AnimateToValue(){
  gsap.to(data,{
    number:props.value,
    duration:2 
  })
}
AnimateToValue()
watch(()=>props.value,()=>{
  AnimateToValue()
})
</script>
