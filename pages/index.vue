<template>
  <div class="container">
    <CommonHeader></CommonHeader>
    <div class="content">
      <div class="acount">
        <h2>ログイン</h2>
        <input v-model="email" name="email" type="email" placeholder="メールアドレス"  required />
        <input v-model="password" name="password" type="password" placeholder="パスワード"  required />
        <button @click="login">ログイン</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      email: null,
      password: null,
      userList:[],
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません')
        return
      }
      firebase
      .auth()
      .signInWithEmailAndPassword(this.email,this.password)
      .then(() => {
        this.$router.push('/home')
      })
      .catch((error) => {
        switch(error.code) {
          case 'auth/invalid-email':
            alert('メールアドレスの形式が違います')
            break
          case 'auth/user-disabled':
            alert('ユーザーが無効になっています')
            break
          case 'auth/user-not-found':
            alert('ユーザーが存在しません')
            break
          case 'auth/wrong-password':
            alert('パスワードが間違っております')
            break
            default:
              alert('エラーが起きました')
              break
        }
      })
    },
  },
}
</script>
<style scoped>
html, body, #__nuxt, #__layout, #__layout > div {
  height: 100vh;
  width: 100%;
}

.register {
  height: 100%;
}

.content {
  height: 100%;
  padding-top: 10%;
  background-color: #141E32;
}

.acount {
  width: 30%;
  height: 200px;
  margin: 0 35%;
  padding-top: 20px;
  background-color: white;
  border-radius: 5px;
}

h2 {
  text-align: center;
  padding-top: 10px;
}
input {
  display: block;
  width: 70%;
  height: 30px;
  border-radius: 5px;
  margin: 10px 15%;
  border: solid 1px black;
}

button {
  display: block;
  background-color: blueviolet;
  color: white;
  border-radius: 20px;
  border: none;
  width: 25%;
  height: 40px;
  margin: 20px 37%;
}
</style>
