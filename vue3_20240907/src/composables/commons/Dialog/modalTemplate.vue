<template>
  <CmnModal @close="onClose">
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
      <button @click="onClose">닫기</button>
    </template>
  </CmnModal>
</template>

<script setup>
import CmnModal from './CmnModal.vue'
import { useModalClose } from './Dialog.js'

// 팝업 닫기용
const emits = defineEmits(['cancel'])
const { onClose } = useModalClose(emits)
// 팝업 닫을 때 onClose에 return 하고 싶은 값은 value에 넣어주면 됨
// 여기까진 기본 설정임 변경하지 말것.

const props = defineProps({
  kakao: { type: Number }
})

const list = new Array(10).fill().map((n, i) => i)
const test = ref('')
const onConfirm = () => onClose({ naver: 7678, test: test.value })

// open 시 실행
onMounted(() => {
  console.log(props)
})
</script>
