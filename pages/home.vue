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
      <div class="post" v-for="post in postData" :key="post.id">
        <p>{{post.name}}</p>
        <button @click="goodBtn(post.good,post.id)"><img src="../img/heart.png"></button>
        <p class="good">{{post.good}}</p>
        <button @click="postDelete(post.id)"><img src="../img/cross.png"></button>
        <NuxtLink :to="{path:`/comment/${post.id}`}"><img src="../img/detail.png"></NuxtLink>
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
      content: null,
      email: null,
      uid:null,
      userList:[],
      postData:[],
      good: false,
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
    async goodBtn(postGood,id) {
      console.log(this.good);
      if (this.good == false) {
        this.good = true
        const send = {
          good:postGood+1,
        };
        await this.$axios.put("http://127.0.0.1:8000/api/post/"+id,send)
        .then(()=> {
          this.getPost();
        });
      } else {
        this.good = false
        const send = {
          good:postGood-1,
        };
        await this.$axios.put("http://127.0.0.1:8000/api/post/"+id,send)
        .then(()=> {
          this.getPost();
        });
      }
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
    }),

    this.getData();
    this.getPost();
  },
}
</script>

<style scoped>
html, body, #__nuxt, #__layout, #__layout > div {
  width: 100%;
  height: 100vh;
  background-color: #141E32;
}

.home {
  display: flex;
  height: 100%;
  width: 100%;
}

.home-menu {
  width: 20%;
  padding: 10px;
}

.container {
  height: 100%;
  width: 80%;
}

.home-img {
  width: 40%;
  height: 30px;
  margin: 10px;
}

.home-img img {
  width: 100%;
  height: 100%;
}

.menu-link {
  padding: 0 10px;
  margin: 10px 0;
}

.menu-link a {
  display: inline-block;
  margin-left: 5px;
}

.menu-link img {
  width: 20px;
  height: 20px;
}

a {
  text-decoration: none;
}

p,
a {
  color: white;
}

textarea {
  width: 90%;
  height: 100px;
  border: solid 1px white;
  background-color: #141E32;
  color: white;
  border-radius: 5px;
  outline: none;
  margin: 10px 0;
}

.home-menu button {
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
  background-color: #141E32;
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
  background-color: #141E32;
  border: none;
}

.post button img {
  width: 100%;
  height: 100%;
}

.post a {
  display: inline-block;
  width: 30px;
  height: 30px;
}

.post a img {
  width: 100%;
  height: 100%;
}

.post p {
  margin: 10px;
}

.post p:first-of-type {
  font-weight: bold;
  display: inline-block;
}

.good {
  display: inline-block;
}
</style>