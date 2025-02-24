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
            <el-input v-model="form.username" placeholder="请输入账户"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="验证密码:" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin" class="full-width">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-link type="info" :underline="false" @click="goToRegister" class="full-width">注册账号</el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElLink } from 'element-plus';

export default {
  name: 'LoginView',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElLink
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
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const studentPassword = localStorage.getItem(this.form.username + '_student');
          const parentPassword = localStorage.getItem(this.form.username + '_parent');
          if (studentPassword === this.form.password) {
            ElMessage.success('学生登录成功');
            this.$router.push('/student');
          } else if (parentPassword === this.form.password) {
            ElMessage.success('家长登录成功');
            this.$router.push('/parent');
          } else {
            ElMessage.error('账户或密码错误');
          }
        } else {
          ElMessage.error('请填写所有必填项');
        }
      });
    },
    goToRegister() {
      this.$router.push('/register');
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

.full-width {
  width: 100%;
}
</style>
