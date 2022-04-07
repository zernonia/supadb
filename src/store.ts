import { User } from "@supabase/gotrue-js"
import { computed, reactive } from "vue"

export const store = reactive({
  user: null as User | null | undefined,
})
