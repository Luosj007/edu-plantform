<template>
  <div>
    <div class="ai-chat">
      <div class="chat-messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.role === 'assistant' ? 'ai-message' : 'user-message']"
        >
          <div class="message-content" v-html="message.content"></div>
          <div v-if="message.loading" class="loading-dots">
            <span></span><span></span><span></span>
          </div>
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
import axios from 'axios';
import { ElMessage } from 'element-plus';
import MarkdownIt from 'markdown-it';

// 初始化 markdown-it 实例
const md = new MarkdownIt();

const question = ref('');
const messages = ref([
  { role: 'assistant', content: '您好，有什么可以帮您的吗？' },
]);
const loading = ref(false);

// 密钥
const API_KEY = process.env.VUE_APP_API_KEY;

// 使用 markdown-it 解析 markdown 为 html
function markdownToHtml(mdText) {
  return md.render(mdText);
}

const askQuestion = async () => {
  if (!question.value.trim()) {
    ElMessage.warning('请输入你的问题');
    return;
  }

  messages.value.push({ role: 'user', content: question.value });

  // 添加AI加载动画消息
  messages.value.push({ role: 'assistant', content: '思考中...', loading: true });
  loading.value = true;

  const replyMessage = messages.value
    .filter(m => !m.loading)
    .slice(-10)
    .map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

  replyMessage.unshift({
    role: 'system',
    content: '你是一个友好的AI助手，回答用户的问题。请保持简洁和友好。',
  });

  question.value = '';

  try {
    const res = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: replyMessage,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = res.data.choices[0].message.content;
    const idx = messages.value.findIndex(m => m.loading);
    if (idx !== -1) messages.value.splice(idx, 1);
    messages.value.push({ role: 'assistant', content: markdownToHtml(reply) });
  } catch (err) {
    const idx = messages.value.findIndex(m => m.loading);
    if (idx !== -1) messages.value.splice(idx, 1);
    console.error('请求异常:', err);
    ElMessage.error('出错了，请检查 API Key 或网络连接');
    messages.value.push({ role: 'assistant', content: '出错了，请检查 API Key 或网络连接' });
  } finally {
    loading.value = false;
  }
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  position: relative; 
  z-index: 0;
  background-image: url('@/assets/1.jpeg');
  background-size: cover;       
  background-position: center;  
  background-repeat: no-repeat; 
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

/* 聊天框大背景 */
.chat-input {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3); 
}

/* deep穿透 */
 :deep(.input-box .el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.5) !important; /* 透明背景 */
}

.answer-button {
  flex-shrink: 0;
}

/* 以下是回答问题加载用的 */
.loading-dots {
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
}
.loading-dots span {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 2px;
  background: #999;
  border-radius: 50%;
  animation: loading-bounce 1s infinite alternate;
}
.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes loading-bounce {
  0% { transform: translateY(0);}
  100% { transform: translateY(-8px);}
}
</style>
