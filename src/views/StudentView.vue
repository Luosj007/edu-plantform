<template>
  <el-container class="layout-container">
    <el-aside width="12.5%">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        text-color="#fff"
        router
      >
        <el-menu-item index="/home">
          <el-icon><Location /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/courses">
          <el-icon><Document /></el-icon>
          <span>课程</span>
        </el-menu-item>
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <span>设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-left">
          用户名：<strong>这里显示用户名</strong>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-icon><Setting /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar">更换头像</el-dropdown-item>
              <el-dropdown-item command="password">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <h1>学生端</h1>
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
    await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    // 执行退出登录的逻辑
    router.push('/login')
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
  background: url('@/assets/logo.png') no-repeat center / 120px auto;
}
.el-aside .el-menu {
  border-right: none;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
}
.header-left {
  font-size: 16px;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 20px;
}
.el-main {
  padding: 20px;
}
</style>
