<template>
  <div class="container">
    <div class="background-image"></div>
    <div class="form-section">
      <div class="form-container">
        <h1 class="title">智能教育平台</h1>
        <el-tabs v-model="activeTab">
          <el-tab-pane label="登录" name="login">
            <el-form :model="loginForm" ref="loginForm" :rules="loginRules" label-width="100px">
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleLogin" class="full-width">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <el-form :model="registerForm" ref="registerForm" :rules="registerRules" label-width="100px">
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="学生密码:" prop="studentPassword">
                <el-input type="password" v-model="registerForm.studentPassword" placeholder="请输入学生密码"></el-input>
              </el-form-item>
              <el-form-item label="再次验证:" prop="confirmStudentPassword">
                <el-input type="password" v-model="registerForm.confirmStudentPassword" placeholder="请再次输入学生密码"></el-input>
              </el-form-item>
              <el-form-item label="家长密码:" prop="parentPassword">
                <el-input type="password" v-model="registerForm.parentPassword" placeholder="请输入家长密码"></el-input>
              </el-form-item>
              <el-form-item label="再次验证:" prop="confirmParentPassword">
                <el-input type="password" v-model="registerForm.confirmParentPassword" placeholder="请再次输入家长密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleRegister" class="full-width">注册</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElTabs, ElTabPane } from 'element-plus';

export default {
  name: 'LoginView',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElTabs,
    ElTabPane
  },
  data() {
    return {
      activeTab: 'login',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        studentPassword: '',
        confirmStudentPassword: '',
        parentPassword: '',
        confirmParentPassword: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名必须是 3-10位 的字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是 6-15位 的非空字符', trigger: 'blur' }
        ]
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名必须是 3-10位 的字符', trigger: 'blur' }
        ],
        studentPassword: [
          { required: true, message: '请输入学生密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是 6-15位 的非空字符', trigger: 'blur' }
        ],
        confirmStudentPassword: [
          { required: true, message: '请再次输入学生密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.registerForm.studentPassword) {
                callback(new Error('两次输入的学生密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        parentPassword: [
          { required: true, message: '请输入家长密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是 6-15位 的非空字符', trigger: 'blur' }
        ],
        confirmParentPassword: [
          { required: true, message: '请再次输入家长密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.registerForm.parentPassword) {
                callback(new Error('两次输入的家长密码不一致'));
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
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const studentPassword = localStorage.getItem(this.loginForm.username + '_student');
          const parentPassword = localStorage.getItem(this.loginForm.username + '_parent');
          if (studentPassword === this.loginForm.password) {
            ElMessage.success('学生登录成功');
            this.$router.push('/student');
          } else if (parentPassword === this.loginForm.password) {
            ElMessage.success('家长登录成功');
            this.$router.push('/parent');
          } else {
            ElMessage.error('用户名或密码错误');
          }
        } else {
          ElMessage.error('请填写所有必填项');
        }
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          if (this.registerForm.studentPassword !== this.registerForm.confirmStudentPassword) {
            ElMessage.error('两次输入的学生密码不一致');
            return;
          }
          if (this.registerForm.parentPassword !== this.registerForm.confirmParentPassword) {
            ElMessage.error('两次输入的家长密码不一致');
            return;
          }
          localStorage.setItem(this.registerForm.username + '_student', this.registerForm.studentPassword);
          localStorage.setItem(this.registerForm.username + '_parent', this.registerForm.parentPassword);
          ElMessage.success('注册成功，请登录');
          this.activeTab = 'login';
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
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/2.jpeg') no-repeat center center;
  background-size: cover;
  z-index: -1;
}

.form-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 1;
}

.form-container {
  background: rgba(255, 255, 255, 0.5); 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  display: flex;
  flex-direction: column; 
  align-items: center;
}

.full-width {
  width: 100%;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #007bbc;
  margin-bottom: 20px;
}
</style>
