<template>
    <div id="app">
        <transition name="fade"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import HotelIndex from './components/HotelIndex.vue'

    export default {
        name: 'app',
        components: {
            HotelIndex
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        /*color: #2c3e50;*/
        /*margin-top: 60px;*/
    }

    * {
        padding: 0;
        margin: 0;
    }

    body {
        background-color: #f9fafc;
    }
</style>
