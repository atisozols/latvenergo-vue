<template>
  <div v-if="isLoading" class="loading">Loading...</div>
  <div v-else-if="searchResults[page]" class="search-results">
    <div v-for="(product, index) in searchResults[page]">
      <div class="title">
        <h3>{{ product.title }} <span class="price">&euro;{{ product.final_price }}</span></h3>
        <p>{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index';

export default {
  name: 'Results',
  components: {}, 
  data(){
    return {}
  },
  mounted(){},
  methods:{
    
  },
  computed:{
    searchResults(){
      return store.getResults()
    }, 
    isLoading(){
      return store.isLoading()
    }
  },
  props: ['page'],
}
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.search-results{
  height:400px;

  >div{
    border: 1px solid black;
    padding: 10px;
    &:nth-child(2){
      margin-top: 10px;
    }
  }
}

.loading{
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.price{
  font-weight: bold;
  margin-left: 30px;
}
</style>
