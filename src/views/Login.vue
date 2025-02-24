<template>
  <div>
    <div class="container">
      <div class="image-section">
        <!-- 在这里放置图片 -->
      </div>
      <div class="form-section">
        <el-form :model="form" ref="form" :rules="rules" label-width="100px">
          <h1 style="text-align: center">教育问答平台</h1>
          <el-form-item label="账户:" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="验证密码:" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRegister">注册</el-button>
            <el-button type="success" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';

export default {
  name: 'LoginView',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleRegister() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.password !== this.form.confirmPassword) {
            ElMessage.error('两次输入的密码不一致');
            return;
          }
          // 保存账户信息到 localStorage
          localStorage.setItem(this.form.username, this.form.password);
          ElMessage.success('注册成功');
        } else {
          ElMessage.error('请填写所有必填项');
        }
      });
    },
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.password !== this.form.confirmPassword) {
            ElMessage.error('两次输入的密码不一致');
            return;
          }
          // 验证账户信息
          const storedPassword = localStorage.getItem(this.form.username);
          if (storedPassword && storedPassword === this.form.password) {
            ElMessage.success('登录成功');
          } else {
            ElMessage.error('账户或密码错误');
          }
        } else {
          ElMessage.error('请填写所有必填项');
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.image-section {
  flex: 2;
  background: url('@/assets/img.png') no-repeat center center;
  background-size: cover;
}

.form-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
