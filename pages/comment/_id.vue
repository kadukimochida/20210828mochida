<template>
<div>
  <p>{{postData.id = postId}}</p>
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
      postId:this.$route.params.id,
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
      const postContent =  await this.$axios.get("http://127.0.0.1:8000/api/post");
      this.postData = postContent.data.data
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