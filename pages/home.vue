<template>
  <div class="home">
    <div class="home-menu">
      <div class="home-img">
        <img src="../img/logo.png">
      </div>
      <div class="menu-link">
        <img src="../img/home.png">
        <NuxtLink to="/home">ホーム</NuxtLink>
      </div>
      <div class="menu-link">
        <img src="../img/logout.png">
        <NuxtLink to="/" @click="logout">ログアウト</NuxtLink>
      </div>
      <p>シェア</p>
      <textarea v-model="content" name="post" cols="10" rows="5" required />
      <button @click= "insertPost">シェアする</button>
    </div>
    <div class="container">
      <h2>ホーム</h2>
      <p v-for="post in postData" :key="post.id">{{post.content}}</p>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data(){
    return {
      name:null,
      content: null,
      email: null,
      password: null,
      uid:null,
      userList:[],
      postData:[],
    }
  },
  methods: {
    async getData(){
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/share/");
      this.userList = resData.data.data;
      console.log(resData);
    },
    async getPost(){
      const postContent =  await this.$axios.get("http://127.0.0.1:8000/api/post");
      this.postData = postContent.data.data
    },
    async insertPost(){
      const sendData = {
        content:this.content,
        user_id:this.uid
      }
      await this.$axios.post("http://127.0.0.1:8000/api/post",sendData);
      this.getPost();
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

<style scoped>
html, body, #__nuxt, #__layout, #__layout > div {
  height: 100vh;
  width: 100%;
  background-color: #19193f;
}

.home {
  display: flex;
  height: 100%;
  width: 100%;
}

.home-menu {
  height: 100%;
  width: 20%;
}

.container {
  height: 100%;
  width: 80%;
}

.home-img {
  width: 30%;
  height: 30px;
}

.home-img img {
  width: 100%;
  height: 100%;
}


.menu-link img {
  width: 30px;
  height: 30px;
}

a {
  text-decoration: none;
}

p,
h2,
a {
  color: white;
}

textarea {
  width: 80%;
  height: 100px;
  margin: 0 5%;
  border: solid 1px white;
  background-color: #19193f;
  color: white;
  border-radius: 5px;
  outline: none;
}

button {
  display: block;
  background-color: blueviolet;
  color: white;
  border-radius: 20px;
  border: none;
  width: 30%;
  height: 30px;
  font-size: 10px;
  margin: 0 0 0 60%;
}
</style>