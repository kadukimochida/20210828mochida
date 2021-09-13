<template>
<div class="home">
    <SideMenu></SideMenu>
    <div class="container">
      <h2>コメント</h2>
      <div class="post" v-for="post in postData" :key="post.id">
        <p>{{post.name}}</p>
        <button><img src="../../img/heart.png"></button>
        <button @click="postDelete(post.id)"><img src="../../img/cross.png"></button>
        <p>{{post.content}}</p>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from '~/plugins/firebase'

export default {
  data(){
    return {
      name:null,
      email: null,
      password: null,
      uid:null,
      userList:[],
      postData:[],
      postId: this.$route.params.id,
      post:[],
    }
  },
  methods: {
    async getData(){
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/share/");
      this.userList = resData.data.data;
      console.log(resData);
    },

    async getPost(){
      const postContent = await this.$axios.get("http://127.0.0.1:8000/api/post/"+this.postId);
      this.postData = postContent.data.data;
      console.log(this.postData);
    },

    async insertPost(){
      const sendData = {
        content:this.content,
        user_uid:this.uid,
        name:this.name,
      }
      await this.$axios.post("http://127.0.0.1:8000/api/post",sendData);
      this.getPost();
      this.content = null
    },
    async postDelete(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/post/"+id,);
      this.getPost();
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
    this.getPost();
    this.getData();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = user.displayName
        this.email = user.email
        this.uid = user.uid
        console.log(user);
      }
    })
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



.container {
  height: 100%;
  width: 80%;
}


a {
  text-decoration: none;
}

p,
h2,
a {
  color: white;
}

.post {
  padding: 20px;
}

.post,
.container h2 {
  border-left: solid 1px white;
  border-bottom: solid 1px white;
}

.container h2 {
  margin: 0;
  padding: 10px;
}

.post button {
  height: 25px;
  width: 40px;
  background-color: #19193f;
  border: none;
}

.post button img {
  width: 100%;
  height: 100%;
}

.post p {
  margin: 0;
}

.post p:first-of-type {
  font-weight: bold;
  display: inline-block;

}
</style>