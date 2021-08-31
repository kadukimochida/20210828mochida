<template>
  <div>
    <h1>ホーム</h1>
    <p>{{ name }}</p>
    <button @click="logout">ログアウト</button>
    <input v-model="content" name="post" type="text" required />
    <button @click= "insertPost">シェアする</button>
    <p>{{postsData}}</p>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data(){
    return {
      name:null,
      content: null,
      uid: null,
      email: null,
      password: null,
      userList:[],
      postData:[],
    }
  },
  methods: {
    async getData(){
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/share/");
      this.userList = resData.data.data;
    },
    async getPost(){
      const postContent =  await this.$axios.get("http://127.0.0.1:8000/api/share/post/");
      this.postData = postContent.data.data
    },
    async insertPost(){
      const sendData = {
        content:this.content,
        user_id:this.uid
      }
      await this.$axios.post("http://127.0.0.1:8000/api/share/post",sendData);
      this.getData();
      this.content = null
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
        this.uid = user.uid
        console.log(user);
      }
    })
    this.getData();
    this.getPost();
  },
}
</script>