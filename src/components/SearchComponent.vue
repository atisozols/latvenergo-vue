<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="searchQuery">
    <input type="submit" value="Search">
  </form>
  <p style="color:red">{{ error }}</p>
  <results-component :page="page"></results-component>
  <div v-if="Object.keys(store.getResults()).length" class="pagination" :class="{'no-back': page < 2, 'no-forward': page >= store.getLastPage() - 1}" >
    <button :class="{'hidden':page < 2}" @click="previousPage()">&#8249;</button>
    <span>{{ page }}</span>
    <button :class="{'hidden':page >= store.getLastPage() - 1}" @click="nextPage()">&#8250;</button>
  </div>
</template>

<script setup>
import ResultsComponent from './ResultsComponent.vue';
import { ref, watch } from 'vue';
import store from '../store';

const searchQuery = ref('');
const error = ref('');
const page = ref(1);

const nextPage = () => {
  page.value += 1;
}

const previousPage = () => {
  if (page.value > 1) {
    page.value -= 1; 
  }
}

watch(page, (value) => {
  if(!store.searchResults[value]){
    store.fetchResults(searchQuery.value, value).then(response => {
      if(!response.length){
        previousPage()
      }
    })
  }
})

const handleSubmit = () => {
  error.value = '';
  page.value = 1
  store.clearResults()
  store.fetchResults(searchQuery.value, 1).then(response => {
    if(response.message){
      store.clearResults()
      error.value = response.message;
    }
  })
};

</script>

<style lang="scss" scoped>

.pagination{
  display: flex;
  justify-content: space-evenly;
  width: 600px;
  margin: 10px auto;
}

.hidden{
  visibility: hidden;
}

form{
  padding: 20px 10px;

  input[type=text]{
    padding: 5px;
    border: 1px solid black;
  }

  input[type=submit]{
    padding: 5px;
    margin-left: 10px;
    background-color: transparent;
    border: 1px solid black;
  }
}

button{
    padding: 5px;
    width: 30px;
    background-color: transparent;
    border: 1px solid black;
}
</style>

