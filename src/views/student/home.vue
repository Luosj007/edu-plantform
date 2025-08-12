<template>
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
        :disabled="loading"
      />
      <el-button type="primary" @click="askQuestion" class="answer-button" :disabled="loading">发送</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { ElMessage } from 'element-plus';
import MarkdownIt from 'markdown-it';
import { getDoubt } from '@/api/question'; 

const md = new MarkdownIt();
const STORAGE_KEY = 'ai_chat_history';

const question = ref('');
const messages = ref([]);
const loading = ref(false);

function markdownToHtml(mdText) {
  return md.render(mdText);
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    messages.value = JSON.parse(saved);
  } else {
    messages.value = [{ role: 'assistant', content: '您好，有什么可以帮您的吗？' }];
  }
});

watch(messages, (val) => {
  const lastTen = val.slice(-10); 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lastTen));
}, { deep: true });

const askQuestion = async () => {
  if (loading.value) return; 

  if (!question.value.trim()) {
    ElMessage.warning('请输入你的问题');
    return;
  }

  const userQ = question.value.trim();
  question.value = '';
  loading.value = true;

  messages.value.push({ role: 'user', content: userQ });
  messages.value.push({ role: 'assistant', content: '思考中...', loading: true });

  try {
    const res = await getDoubt({ question: userQ });
    const idx = messages.value.findIndex(m => m.loading);
    if (idx !== -1) messages.value.splice(idx, 1);
    if (res.success) {
      messages.value.push({ role: 'assistant', content: markdownToHtml(res.data.answer) });
    } else {
      ElMessage.error('接口返回失败');
      messages.value.push({ role: 'assistant', content: '抱歉，回答失败了。' });
    }
  } catch (err) {
    const idx = messages.value.findIndex(m => m.loading);
    if (idx !== -1) messages.value.splice(idx, 1);
    ElMessage.error('请求出错，请检查网络或接口');
    messages.value.push({ role: 'assistant', content: '请求出错，请检查网络或接口' });
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

.chat-input {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3); 
}

.answer-button {
  flex-shrink: 0;
}

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
