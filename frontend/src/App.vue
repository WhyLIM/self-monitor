<template>
    <div id="app">
        <header>
            <h1>Self Monitor</h1>
        </header>
        <main>
            <HomePage />
        </main>
        <footer>
            <p>© 2024 Self Monitor</p>
        </footer>
    </div>
</template>

<script setup>
import HomePage from '@/pages/HomePage.vue'
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
}

header {
    background-color: #42b983;
    color: white;
    padding: 20px;
}

footer {
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
}
</style>
