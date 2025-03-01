<template>
  <div>
    <h1>首页</h1>
    <!-- 这里是首页的内容 -->
    <div class="ai-chat">
      <h2>AI 问答</h2>
      <el-input
        v-model="question"
        placeholder="请输入你的问题"
        @keyup.enter="askQuestion"
        clearable
      ></el-input>
      <el-button type="primary" @click="askQuestion">提问</el-button>
      <div v-if="answer" class="answer">
        <h3>回答：</h3>
        <p>{{ answer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const question = ref('')
const answer = ref('')

const askQuestion = async () => {
  if (!question.value) {
    ElMessage.warning('请输入你的问题')
    return
  }

  // 模拟 AI 回答
  answer.value = '这是一个模拟的回答。'
  question.value = ''
}
</script>

<style scoped>
.ai-chat {
  margin-top: 20px;
}
.answer {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
