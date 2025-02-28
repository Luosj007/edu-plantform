<template>
  <el-container class="layout-container">
    <el-aside width="12%">
      <div class="el-aside__logo"></div>
      <!-- 这是侧边栏 -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        text-color="#fff"
        router
      >
        <el-menu-item index="/student">
          <el-icon><Location /></el-icon>
          <span>进入首页</span>
        </el-menu-item>
        <el-menu-item index="/courses">
          <el-icon><Document /></el-icon>
          <span>学习情况</span>
        </el-menu-item>
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <span>个性设置</span>
        </el-menu-item>
      </el-menu>
      <!-- 分割线 -->
    </el-aside>
    <el-container>
      <el-header>
        <h1 class="header-title">学生端</h1>
        <el-dropdown class="header-dropdown" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-icon><Setting /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="information">个人信息</el-dropdown-item>
              <el-dropdown-item command="password">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 这是主要内容区域 -->
        <!-- <router-view /> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { Document, Location, Setting } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleCommand = async (command) => {
  if (command === 'logout') {
    try {
      await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
      // 执行退出登录的逻辑
      router.push('/login')
} catch (error) {
      if (error !== 'cancel') {
        throw error
      }
    }
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}
.el-aside {
  background-color: #232323;
}
.el-aside__logo {
  height: 120px;
  background: url('@/assets/logo.png') no-repeat center;
  background-size: cover;
}
.el-aside .el-menu {
  text-align: center;
}
.el-aside .el-menu-item:hover {
  background-color: #007acc !important;
}
.el-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
  position: relative;
}
.header-title {
  margin: 0;
}
.header-dropdown {
  position: absolute;
  right: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 20px;
}
.el-dropdown-link:focus,
.el-dropdown-link:active {
  outline: none;
  box-shadow: none;
}
.el-main {
  padding: 20px;
}
</style>
