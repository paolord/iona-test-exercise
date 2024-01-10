<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { onBeforeMount, reactive } from 'vue'
  import { catSingle } from '@/api/cats'

  const state: any = reactive({ image: '', name: '', origin: '', temperament: '', description: '', breedId: '' })

  const route = useRoute()

  async function getCatSingle() {
    const res = await catSingle(route.params.id)
    const { url, breeds } = res;
    state.image = url;
    const {name, origin, temperament, description, id} = breeds[0]
    state.name = name
    state.origin = origin
    state.temperament = temperament
    state.description = description
    state.breedId = id
  }
  onBeforeMount(() => {
    getCatSingle()
  });
</script>

<template>
  <main>
    <b-container>
        <b-row :style="{ 'margin': '10px 0px' }">
          <b-col>
            <b-button :href="'/?breed='+state.breedId" variant="primary">Back</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>            
            <b-card>          
              <b-card-img :src="state.image" alt="Image" bottom></b-card-img>
              <div class="card-body">
                <h4>{{state.name}}</h4>
                <h5>Origin: {{ state.origin }}</h5>
                <h6>{{ state.temperament }}</h6>
                <p>{{ state.description }}</p>
              </div>
            </b-card>
          </b-col>
        </b-row>
    </b-container>


  </main>
</template>