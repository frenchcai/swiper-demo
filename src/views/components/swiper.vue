<template>
  <div class="swiperPage">
    <div class="swiperContaniner">
      <div class="swiperList" ref="swiper">
        <div class="swiperItem">4</div>
        <div class="swiperItem" :key="index" v-for="(item, index) in pageNum">
          {{ index + 1 }}
        </div>
        <div class="swiperItem">1</div>
        <!-- <div class="swiperItem"></div>
        <div class="swiperItem"></div>
        <div class="swiperItem"></div> -->
      </div>
      <div class="icons">
        <div
          class="icon"
          @click="page(index)"
          :class="{
            activeIcon:
              index == nowPage  || (nowPage >= pageNum && nowPage - pageNum  == index)
          }"
          :key="index"
          v-for="(item, index) in pageNum"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
/**
 * 轮播组件实现方案1
 * 使用相对定位+定时器，定时设置left偏移量，达到效果
 * 无限轮播需要添加多一个item，当page达到最大值的时候，使用一个定时器
 * 延迟指定秒数后，将left 改成一开始的page=1的值，并关闭过渡效果即可
 * 缺点：无限轮播的时候,
 *
 */

import { clear } from 'console'
import { onMounted, ref } from 'vue'

interface swiper {
  [any: string]: any
}

const swiper: swiper = ref(null)
let timer = null
let reset = null
const delay = 3000
const nowPage = ref(0)

const pageNum = ref(4)

const itemWidth = ref(750)

function start(fn?:undefined|Function) {
 (typeof fn =="function") &&(fn())
  timer = setInterval(() => {
    nowPage.value += 1
    move()
  }, delay)
}


const startX = ref(0)
const startY = ref(0)

const endX = ref(0)
const endY = ref(0)

onMounted(() => {
  start()
  swiper.value.addEventListener("touchstart",(e:TouchEvent)=>{
    console.log(e)
    clearInterval(timer)
    timer = null
    startX.value = e.changedTouches[0].clientX
    startY.value = e.changedTouches[0].clientY
})

 swiper.value.addEventListener("touchmove",(e:TouchEvent)=>{
   
   clearInterval(timer)
    timer = null
    endX.value = e.changedTouches[0].clientX
    endY.value = e.changedTouches[0].clientY
})

 swiper.value.addEventListener("touchend",(e:TouchEvent)=>{
    console.log(e)
     if (endX.value > startX.value){ // 右滑
	    	pre();
	    } else { // 左滑
	    	next();
	    }
})

})

function move() {
  swiper.value.style.transition = 'left 1.5s'
  swiper.value.style.left = `${-nowPage.value * itemWidth.value-itemWidth.value}px`

  if (nowPage.value == pageNum.value ) {
    //轮播完第一次，重新进入第一页后，重置page，并关闭过渡动画
    reset= setTimeout(() => {
      swiper.value.style.transition = ''
      nowPage.value = 0
      swiper.value.style.left = `${-nowPage.value * itemWidth.value-itemWidth.value}px`
      reset = null
    }, 1500)
  }

  
}

function page(page: number) {
  if (timer) {
    clearInterval(timer)
    timer = null
  }

  nowPage.value = page
  start(move)
}

function next(){
    if(nowPage.value==pageNum.value){
        if(reset)return
        page(0) 
    }else{
        page(nowPage.value+1)
    }
   
}

function pre(){
    if(nowPage.value===0)return
    page(nowPage.value-1)
}




</script>
<style scoped>
.swiperPage {
  width: 750px;
}
.swiperContaniner {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.swiperList {
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  left: -750px;
}
.icons {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
}
.icon {
  width: 16px;
  height: 16px;
  border-radius: 100%;
  outline: 1px solid white;
  margin-right: 12px;
}
.activeIcon {
  background: white;
}
.swiperItem {
  flex-shrink: 0;
  width: 750px;
  height: 200px;
  background: red;
  text-align: center;
  color: white;
  font-size: 30px;
}
.swiperItem:nth-child(2n + 1) {
  background: blue;
}
</style>