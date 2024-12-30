<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <PostForm v-model:title="form.title" v-model:content="form.content" @submit.prevent="save">
      <template #actions>
        <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>
        <button class="btn btn-primary">저장</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { createPost } from '@/api/posts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PostForm from '../../components/posts/PostForm.vue'
import { useAlert } from '@/coposable/alertjs'

const { vAlert, vSuccess } = useAlert()

const router = useRouter()
const form = ref({
  title: null,
  content: null,
})
const save = () => {
  try {
    createPost({
      ...form.value,
      createAt: Date.now(),
    })
    vSuccess('등록이 완료되었습니다.')
    router.push({ name: 'PostList' })
  } catch (error) {
    console.error(error)
    vAlert(error.message)
  }
}
const goListPage = () => router.push({ name: 'PostList' })
</script>

<style lang="scss" scoped></style>
