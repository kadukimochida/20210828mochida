<template>
  <div class="header">
    <div class="header-img">
      <img src="../img/logo.png">
    </div>
    <ul>
      <li><NuxtLink to="/register">新規登録</NuxtLink></li>
      <li><NuxtLink to="/">ログイン</NuxtLink></li>
    </ul>
  </div>
</template>

<style scoped>

.header {
  width: 100%;
  height: 100px;
  background-color: #141E32;
  display: flex;
  justify-content: space-between;
}
.header-img {
  width: 150px;
  height: 50%;
  margin: 20px 20px;
}
img {
  width: 100%;
  height: 100%;
}
ul {
  display: flex;
  padding: 0;
  width: 200px;
}
li {
  display: flex;
  align-items: center;
  list-style: none;
  width: 50%;
}
a {
  color: white;
  text-decoration: none;
}

</style>