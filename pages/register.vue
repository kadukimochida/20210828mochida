<template>
  <div class="register">
    <CommonHeader />
    <div class="content">
      <div class="acount">
        <h2>新規登録</h2>
        <input v-model="userName" name="name" type="text" placeholder="ユーザーネーム" required />
        <input v-model="email" name="email" type="email" placeholder="メールアドレス"  required />
        <input v-model="password" name="password" type="password" placeholder="パスワード"  required />
        <button @click="register">新規登録</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  date() {
    return {
      userName: null,
      email: null,
      password: null,
    }
  },
  methods: {
    register() {
      const sendData = {
        name:this.userName,
        email:this.email,
        password:this.password,
      };
      this.$axios.post("http://127.0.0.1:8000/api/share/",sendData);
      if (!this.userName || !this.email || !this.password) {
        return
      }
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.email,this.password)
      .then((data) => {
        data.user.sendEmailVerification().then(() => {
          this.$router.replace('/')
        })
        data.user.updateProfile({
          displayName:this.userName
        })
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            alert('メールアドレスの形式が違います')
            break
          case 'auth/email-already-in-use':
            alert('このメールアドレスは既に使われています')
            break
          case 'auth/weak-password':
            alert('パスワードは６文字以上で入力してください')
            break
          default:
            alert('エラーが起きました')
        }
      });
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
  background-color: #19193F;
}

.acount {
  width: 30%;
  height: 300px;
  margin: 0 35%;
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