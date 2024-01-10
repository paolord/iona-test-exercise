<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { onBeforeMount, reactive } from 'vue'
  import { catBreeds, catImages } from '@/api/cats'

  const route = useRoute()

  const state: any = reactive({ breeds: [], selectedBreed: '', images: [], page: 1, loadMore: true })
  async function getCatBreeds() {
    state.breeds = await catBreeds()
  }
  onBeforeMount(() => {
    getCatBreeds()
    if (route.query.breed) {
      loadImages(route.query.breed)
    }
  });

  async function loadImages(breedId: any) {
    state.loadMore = true
    state.page = 1
    state.selectedBreed = breedId
    state.images = await catImages(breedId, state.page)
  }

  async function selectHandler(e: any) {
    await loadImages(e.currentTarget.value)
  }

  async function handleLoadMore() {
    state.page += 1
    let images = await catImages(state.selectedBreed, state.page)
    
    images = images.reduce((collected: any[], image: any) => {
      console.log(state.images.find((i: any) => i.id === image.id))
      if (typeof state.images.find((i: any) => i.id === image.id) === 'undefined') {
        collected.push(image);
      }

      return collected;
    }, [])
    if (images.length === 0) {
      state.loadMore = false
    }
    if (images.length > 0) {
      state.images = state.images.concat(images);
    }
  }
</script>

<template>
  <main>
    <b-container>
      <h1>Cat Browser</h1>
      <b-row :style="{ 'margin-bottom': '10px' }">
        <b-col cols="12" sm="6" md="3">
          <label>
            Breed
          </label>
          <select id="breed" class="form-control" @change="selectHandler">
            <option value="">Select breed</option>
            <option :key="breed.id" v-for="breed in state.breeds" :value="breed.id" :selected="breed.id === state.selectedBreed">
              {{ breed.name }}
            </option>
          </select>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" sm="6" md="3" v-for="image in state.images" :key="image.id">
          <b-card
            :img-src="image.url"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >

            <b-button :href="'/cats/'+image.id" variant="primary">View details</b-button>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-if="state.loadMore">
        <b-col>
          <b-button variant="success" @click="handleLoadMore">Load more</b-button>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>