<template>
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
      <p>持田香津季</p>
  </div>
</template>



<style scoped>
html, body, #__nuxt, #__layout, #__layout > div {
  width: 100%;
  height: 100vh;
}


.home-menu {
  width: 20%;
  height: 100%;
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


</style>