<template>
    <div class="menulists">
        <div class="intro">
            <h1>My Todo Lists</h1>
        </div>
         <form v-on:submit.prevent>
            <label>Add a list</label>
            <input v-model="NewTitle" placeholder="Ex. grocery list"/>
            <button v-on:click="SelfCreateList($event, NewTitle)">Add</button>
         </form>
        <MenuList
            v-for="(list, index) in lists" 
            :key="index"
            :index="index"
            :list="list"
            :deleteList="SelfDeleteList"
            :updateList="SelfUpdateList"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuList from '@/components/MenuList.vue'

export default defineComponent ({
    name: 'MenuLists',
    components: {
        MenuList
    },
    props: {
        lists: {
            type: Array as () => Array<any>,
            default: () => [],
        },
        deleteList: {
            type: Function,
            required: true,
        },
        createList: {
            type: Function,
            required: true,
        },
        updateList: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            NewTitle: '',
        }
    },
    methods: {
        SelfCreateList(event: Event, title : String) {
            this.NewTitle = ''
            this.createList(event, title)
        },
        SelfDeleteList(event: Event, list: Object) {
            this.deleteList(event, list, this.lists)
        },
        SelfUpdateList(event: Event, index: Number, list: Object) {
            this.updateList(event, index, list, this.lists)
        }
    }
})
</script>

<style scoped lang="scss">
* {
    padding: 0px;
    margin: 0px;
}
.menulists {
    background-color: #014945;
    width: 640px;
    margin: auto;
    padding-bottom: 20px;
    border-radius: 5px;
    overflow: hidden;
}
.intro {
    background-color: #007e69;
    padding: 20px;
    margin-bottom: 20px;

    -webkit-box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
    -moz-box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
    box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
}
.intro h1 {
    color: #dbd9d9;
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
    max-width: 100%;
}
form {
    position: relative;
    padding-top: 20px;
    margin: 10px auto 10px auto;
    width: 300px;
    display: inline-block;

    -webkit-box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
    -moz-box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
    box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
}
form label {
    position: absolute;
    display: block;
    top: 0px;
    left: 10px;
    font-size: 1rem;
    color: #dbd9d9;
    font-style: italic;
}
form input {
    width: auto;
    height: 40px;
    background-color: #dbd9d9;
    color: #007e69;
    padding-left: 20px;
    border-radius: 5px 0px 0px 0px;
}
form input::placeholder {
    color: #007e69;
}
form button {
    width: 100px;
    height: 43px;
    background-color: #007e69;
    color: #dbd9d9;
    font-size: 1em;
    font-weight: bold;
}
form input,
form button {
    border: none;
    border-bottom: 2px solid #007e69;
}
form input:focus,
form button:focus {
    outline: none;
}
</style>