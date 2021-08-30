<template>
  <div>
    <h1>ホーム</h1>
    <p>{{ name }}</p>
    <button @click="logout">ログアウト</button>
    <input v-model="post" name="post" type="text" required />
    <button @click= "insertPost">シェアする</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data(){
    return {
      name:null,
      post: null,
      userId: '',
      email: null,
      password: null,
    }
  },
  mounted() {
    this.userId = window.localStorage.getItem("userId")
  },
  methods: {
    logout() {
      firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.replace('/')
      })
    },
    insertPost() {
      const sendData = {
        post:this.post,
        user_id:this.userId,
      }
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = user.displayName
        console.log(user);
      }
    })
  },
}
</script>