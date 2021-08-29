<template>
  <div>
    <h1>ホーム</h1>
    <p>{{ name }}</p>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data(){
    return {
      name:null,
    }
  },
  methods: {
    logout() {
      firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.replace('/')
      })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = user.displayName
        console.log(user)
      }
    })
  }
}
</script>