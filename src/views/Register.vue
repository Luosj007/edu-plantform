<template>
  <div>
    <div class="container">
      <div class="image-section">
      </div>
      <div class="form-section">
        <el-form :model="form" ref="form" :rules="rules" label-width="100px">
          <h1 style="text-align: center">教育问答平台</h1>
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="学生密码:" prop="studentPassword">
            <el-input type="password" v-model="form.studentPassword" placeholder="请输入学生密码"></el-input>
          </el-form-item>
          <el-form-item label="再次验证:" prop="confirmStudentPassword">
            <el-input type="password" v-model="form.confirmStudentPassword" placeholder="请再次输入学生密码"></el-input>
          </el-form-item>
          <el-form-item label="家长密码:" prop="parentPassword">
            <el-input type="password" v-model="form.parentPassword" placeholder="请输入家长密码"></el-input>
          </el-form-item>
          <el-form-item label="再次验证:" prop="confirmParentPassword">
            <el-input type="password" v-model="form.confirmParentPassword" placeholder="请再次输入家长密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRegister" class="full-width">注册</el-button>
          </el-form-item>
          <el-form-item>
            <el-link type="info" :underline="false" @click="goToLogin" class="full-width">返回登录</el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElLink } from 'element-plus';

export default {
  name: 'RegisterView',
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
        studentPassword: '',
        confirmStudentPassword: '',
        parentPassword: '',
        confirmParentPassword: ''
      },
      rules: {
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
              if (value !== this.form.studentPassword) {
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
              if (value !== this.form.parentPassword) {
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
    handleRegister() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.studentPassword !== this.form.confirmStudentPassword) {
            ElMessage.error('两次输入的学生密码不一致');
            return;
          }
          if (this.form.parentPassword !== this.form.confirmParentPassword) {
            ElMessage.error('两次输入的家长密码不一致');
            return;
          }
          // 保存学生密码和家长密码到 localStorage
          localStorage.setItem(this.form.username + '_student', this.form.studentPassword);
          localStorage.setItem(this.form.username + '_parent', this.form.parentPassword);
          ElMessage.success('注册成功');
        } else {
          ElMessage.error('请填写所有必填项');
        }
      });
    },
    goToLogin() {
      this.$router.push('/login');
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
