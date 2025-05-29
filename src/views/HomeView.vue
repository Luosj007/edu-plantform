<template>
  <div>
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
        <el-button type="primary" @click="askQuestion" class="answer-button">发送</el-button>
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
  question.value = ''; 

  setTimeout(() => {
    const aiReply = `${userMessage}是一个很好的问题！`;
    messages.value.push({ type: 'ai', content: aiReply });
  }, 1000); 
};
</script>

<style scoped>
.ai-chat {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: 85vh;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
  position: relative; /* 确保容器建立层叠上下文 */
  z-index: 0;
  background-image: url('@/assets/1.jpeg');
  background-size: cover;       /* 覆盖整个容器 */
  background-position: center;  /* 图片居中 */
  background-repeat: no-repeat; /* 不重复 */
}


.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.3); 
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
  background-color: #95ec69;
  color: #333;
}

.chat-input {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3); 
}

.input-box {
  flex: 1;
}

.answer-button {
  flex-shrink: 0;
}
</style>
