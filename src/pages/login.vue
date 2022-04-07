<script setup lang="ts">
import { supabase } from "@/plugins/supabase"

const login = () => {
  supabase.auth.signIn({
    provider: "github",
  })
}
</script>

<template>
  <div>
    <button @click="login">login with Github</button>
  </div>
</template>
