<template>
  <div>
    <h1>推荐课程</h1>
    <el-table :data="questions" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="question" label="问题" />
      <el-table-column prop="answer" label="回答" />
      <el-table-column
        prop="createdAt"
        label="创建时间"
        width="180"
        :formatter="formatDate"
      />
      <el-table-column
        prop="updatedAt"
        label="更新时间"
        width="180"
        :formatter="formatDate"
      />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getList } from '@/api/question'

const questions = ref([])

function formatDate(row, column, cellValue) {
  if (!cellValue) return ''
  const date = new Date(cellValue)
  return date.toLocaleString()
}

async function fetchQuestions() {
  try {
    const res = await getList()
    if (res.success) {
      questions.value = res.data
    } else {
      console.error('接口返回失败')
    }
  } catch (error) {
    console.error('请求出错', error)
  }
}

onMounted(() => {
  fetchQuestions();
})
</script>

<style scoped>
h1 {
  margin-bottom: 16px;
}
</style>
