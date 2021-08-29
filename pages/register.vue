<template>
  <div class="register">
    <CommonHeader />
    <div class="content">
      <div class="acount">
        <input v-model="username" type="text" value="ユーザーネーム" required />
        <input v-model="email" type="email" value="メールアドレス" required />
        <input v-model="password" type="password" value="パスワード" required />
        <button @click="register">新規登録</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
html, body, #__nuxt, #__layout, #__layout > div {
  height: 100%;
  width: 100%;
}

.register {
  height: 100%;
}

.content {
  height: 100%;
}

.acount {
  width: 30%;
}

input {
  display: block;
}
</style>