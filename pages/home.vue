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
      userId: null,
      email: null,
      password: null,
      userList:[],
    }
  },
  methods: {
    async getData(){
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/share/");
      this.userList = resData.data.data;
      this.userId = userList.id;
    },
    logout() {
      firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.replace('/')
      })
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = user.displayName
        this.email = user.email
        console.log(user);
      }
    })
  },
}
</script>