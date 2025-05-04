<template>
  <div>
    <h1>AI 问答</h1>
    <div class="ai-chat">
      <div class="chat-messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.type === 'ai' ? 'ai-message' : 'user-message']"
        >
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
      <div class="chat-input">
        <el-input
          v-model="question"
          placeholder="请输入你的问题"
          class="input-box"
          @keyup.enter="askQuestion"
        />
        <el-button type="primary" @click="askQuestion" class="answer-button">回答</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const question = ref('');
const messages = ref([
  { type: 'ai', content: '你好，有什么可以帮您的吗？' },
]);

const askQuestion = async () => {
  if (!question.value.trim()) {
    ElMessage.warning('请输入你的问题');
    return;
  }

  // 添加用户消息
  messages.value.push({ type: 'user', content: question.value });
  const userMessage = question.value;
  question.value = ''; // 清空输入框

  // 模拟 AI 回复
  setTimeout(() => {
    const aiReply = `AI 回复：您刚才说的是 "${userMessage}"，这是一个很好的问题！`;
    messages.value.push({ type: 'ai', content: aiReply });
  }, 1000); // 模拟延迟
};
</script>

<style scoped>
.ai-chat {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: 80vh;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f9f9f9;
}

.message {
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.ai-message {
  align-self: flex-start;
  background-color: #ffffff;
  color: #333;
}

.user-message {
  align-self: flex-end;
  background-color: #9eea6a;
  color: #fff;
}

.chat-input {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
}

.input-box {
  flex: 1;
}

.answer-button {
  flex-shrink: 0;
}
</style>
