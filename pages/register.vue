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
  data() {
    return {
      userName: null,
      email: null,
      password: null,
      uid:null,
    }
  },
  methods: {
    register() {
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
        console.log(data.user);
        this.uid = data.user.uid
        const sendData = {
        name:this.userName,
        email:this.email,
        password:this.password,
        uid:this.uid,
      };
      console.log(this.uid);
      this.$axios.post("http://127.0.0.1:8000/api/share/",sendData);
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
  background-color: #141E32;
}

.acount {
  width: 30%;
  height: 250px;
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