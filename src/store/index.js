import { reactive } from 'vue'

const store = reactive({
    searchResults: {},
    loading: false,
    lastPage: 2,
    clearResults() {
      this.searchResults = {};
      this.lastPage = 2;
    },
    getResults() {
        return this.searchResults;
    },
    async fetchResults(query, page) {
        try {
            this.loading = true;
            const response = await fetch('http://localhost:5001/api/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query, page: page })
          });
      
          if (response.status === 200) {
            const results = await response.json();
            if(results.length){
                this.searchResults[page] = results;
                this.lastPage += 1
            } else{
                this.lastPage = page
            }
            return {length: results.length}
          } else {
            const errorData = await response.json();
            console.log('Error occurred:', errorData.message);
            return {message: errorData.message}
          }
          
        } catch (error) {
          console.error('Error occurred:', error);
        } finally {
            this.loading = false;
        }
    },
    isLoading(){
        return this.loading
    },
    getLastPage(){
        return this.lastPage
    }
  })

export default store;