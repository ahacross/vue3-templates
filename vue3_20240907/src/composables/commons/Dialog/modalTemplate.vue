<template>
  <CmnModal :close="close">
    <template #title> 이거시 타이틀 </template>
    <template #default>
      <div v-for="(item, idx) in list" :key="idx">
        {{ `무어라 해야 할까? ${item}` }}
      </div>
      <label>
        <input type="text" v-model="test" />
      </label>
    </template>
    <template #buttons>
      <button class="point" @click="onConfirm">확인</button>
      <button @click="close">닫기</button>
    </template>
  </CmnModal>
</template>

<script setup>
// 팝업 닫을 때 onClose에 넘겨주고 싶은 값은 value에 넣어주면 됨
const props = defineProps({
  close: Function, // 팝업 close 함수
  // 아래 props는 custom
  kakao: Number
})

// open 시 실행
onMounted(() => {
  console.log(props)
})

const list = new Array(10).fill().map((n, i) => i)
const test = ref('')
const onConfirm = () => props.close({ naver: 7678, test: test.value })
</script>
