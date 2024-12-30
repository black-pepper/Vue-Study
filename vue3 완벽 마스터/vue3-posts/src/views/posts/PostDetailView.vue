<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}</p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="remove" :disabled="removeLoading">
          <template v-if="removeLoading">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else> 삭제 </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { deletePost, getPostById } from '@/api/posts'
import { ref } from 'vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AppError from '@/components/app/AppError.vue'
import { useAlert } from '@/coposable/alertjs'

const { vAlert } = useAlert()

const props = defineProps({
  id: [String, Number],
})

const router = useRouter()
const post = ref({})
const error = ref(null)
const loading = ref(false)

const fetchPost = async () => {
  try {
    loading.value = true
    const { data } = await getPostById(props.id)
    setPost(data)
  } catch (err) {
    console.error(err)
    vAlert(err.message)
    error.value = err
  } finally {
    loading.value = false
  }
}
const setPost = (data) => {
  post.value.title = data.title
  post.value.content = data.content
  post.value.createdAt = data.createdAt
}
fetchPost()

const removeError = ref(null)
const removeLoading = ref(false)
const remove = async () => {
  try {
    removeLoading.value = true
    await deletePost(props.id)
    router.push({ name: 'PostList' })
  } catch (err) {
    console.error(err)
    removeError.value = err
  } finally {
    removeLoading.value = false
  }
}

const goListPage = () => router.push({ name: 'PostList' })
const goEditPage = () => router.push({ name: 'PostEdit', params: { id: props.id } })
</script>

<style lang="scss" scoped></style>
