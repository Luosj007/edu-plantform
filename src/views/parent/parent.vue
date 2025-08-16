<template>
  <div>
    <h1>问答记录</h1>
    <el-table :data="paginatedData" border style="width: 100%">
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

    <!-- 分页组件 -->
    <el-pagination
      class="pagination"
      background
      layout="sizes, prev, pager, next, jumper, ->, total"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20]"
      :total="questions.length"
      :page-size-options="[5,10,20]"
      :total-format="formatTotal"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getList } from '@/api/question'

const questions = ref([])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(5) // 默认每页5条

// 当前页显示的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return questions.value.slice(start, end)
})

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

// 分页切换回调
function handlePageChange(page) {
  currentPage.value = page
}

// 每页条数改变
function handleSizeChange(size) {
  pageSize.value = size
  currentPage.value = 1 // 重置到第一页
}

// 中文总数显示
function formatTotal(total) {
  return `共 ${total} 条`
}

onMounted(() => {
  fetchQuestions()
})
</script>

<style scoped>
h1 {
  margin-bottom: 16px;
}
.pagination {
  margin-top: 16px;
  text-align: right;
}
</style>
