<template>
<div class="home">
    <SideMenu></SideMenu>
    <div class="container">
      <h2>コメント</h2>
      <div class="post" v-for="post in postData" :key="post.id">
        <p>{{post.name}}</p>
        <button @click="goodBtn(post.good,post.id)"><img src="../../img/heart.png"></button>
        <p class="good">{{post.good}}</p>
        <button @click="postDelete(post.id)"><img src="../../img/cross.png"></button>
        <p>{{post.content}}</p>
      </div>
      <div class="comment" v-for="post in postData" :key="post.id">
        <div class="ttl">コメント</div>
          <div class="content" v-for="comment of post.comments" :key="comment.id">
            <p>{{comment.name}}</p>
            <p>{{comment.comment}}</p>
            </div>
      </div>
      <div class="form">
        <input type="text" name="comment" v-model="comment" maxlength="120" required>
        <div class="btn">
          <button @click="insertComment">コメント</button>
        </div>
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
      comment: null,
      good:false
    }
  },
  methods: {
    async getData(){
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/share/");
      this.userList = resData.data.data;
    },
    
    async getPost(){
      const postContent = await this.$axios.get("http://127.0.0.1:8000/api/post/"+this.postId)
      this.postData = postContent.data.data;
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
      this.$router.push("/home")
    },


    async insertComment() {
      const sendComment = {
        post_id:this.postId,
        name:this.name,
        comment: this.comment,
      }
      await this.$axios.post("http://127.0.0.1:8000/api/comment",sendComment);
      this.getPost();
      this.comment = null
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
      }
    })
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
.ttl,
.content,
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

.comment p,
.post p {
  margin: 10px;
}

.content p:first-of-type,
.post p:first-of-type {
  font-weight: bold;
  display: inline-block;
}

.ttl {
  text-align: center;
  margin: 0;
  padding: 10px 0;
  color: white;
}

.content {
  padding: 10px 10px;
  background-color: #141E32;
}

.good {
  display: inline-block;
}

input {
  display: block;
  width: 90%;
  height: 40px;
  border: solid 1px white;
  background-color: #141E32;
  color: white;
  border-radius: 8px;
  margin: 20px 0 20px 10px;
  outline: none;
}

.btn {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
}

.btn button {
  display: block;
  background-color: blueviolet;
  color: white;
  border-radius: 20px;
  border: none;
  width: 70px;
  height: 30px;
  font-size: 10px;
}
</style>