<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue'
  import { catBreeds, catImages } from '@/api/cats'

  const state = reactive({ breeds: [], selectedBreed: '', images: [], page: 1, loadMore: true })
  async function getCatBreeds() {
    state.breeds = await catBreeds()
  }
  onBeforeMount(() => {
    getCatBreeds()
  });

  async function selectHandler(e: any) {
    // console.log('selected', e.currentTarget.value)
    state.loadMore = true
    state.page = 1
    state.selectedBreed = e.currentTarget.value
    state.images = await catImages(e.currentTarget.value, state.page)
  }

  async function handleLoadMore() {
    // console.log('selected', e.currentTarget.value)
    state.page += 1
    let images = await catImages(state.selectedBreed, state.page)
    console.log('old', state.images);
    console.log('new', images);
    images = images.reduce((collected, image) => {
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
            <option :key="breed.id" v-for="breed in state.breeds" :value="breed.id">
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

            <b-button href="#" variant="primary">View details</b-button>
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

<!-- <script lang="ts">
 import { defineComponent } from 'vue'
import type { onMounted } from 'vue';
  type GetProductsType = {

  }

  export default defineComponent({
    data() {
      return {
        breeds: [],
      }
    },
    created() {
      this.getProducts()
    },
    methods: {
      async getProducts()  {
        this.breeds = await catBreeds()
      },
    },
  })
</script> -->