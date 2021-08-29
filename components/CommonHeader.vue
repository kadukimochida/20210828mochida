<template>
  <div class="header">
    <div class="header-img">
      <img src="../img/logo.png">
    </div>
    <ul>
      <li><NuxtLink to="/register">新規登録</NuxtLink></li>
      <li><NuxtLink to="/login">ログイン</NuxtLink></li>
    </ul>
  </div>
</template>

<style scoped>

.header {
  width: 100%;
  height: 60px;
  background-color: #19193f;
  display: flex;
  justify-content: space-between;
}
.header-img {
  width: 200px;
  height: 100%;
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
  list-style: none;
  width: 50%;
}
a {
  color: white;
  text-decoration: none;
}

</style>