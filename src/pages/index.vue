<script setup lang="ts">
import { supabase } from "@/plugins/supabase"
import { store } from "@/store"
import { ref } from "vue"

const login = () => {
  supabase.auth.signIn({
    provider: "github",
  })
}

const anon_key = ref("")
const getAnonKey = () => {
  fetch("./api/user/generate", {
    method: "POST",
    body: JSON.stringify({
      id: store.user?.id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (anon_key.value = res.key))
}
</script>

<template>
  <div>
    Index

    <button @click="login">login with Github</button>
    <button @click="getAnonKey">get Anon Key</button>

    {{ anon_key }}
  </div>
</template>
