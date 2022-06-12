<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useAuthStore} from "../stores/useAuth";

const auth = useAuthStore();
const router = useRouter();

onMounted(() => {
  auth.logout().then(() => {
    router.push({ name: "login" });
  });
});
</script>
