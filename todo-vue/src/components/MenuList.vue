<template>
    <div class="menulist">
        <h3 contenteditable spellcheck="false" v-on:blur="updateList($event, index, {
            icon:list.icon, 
            title:$event.target.innerText,
            message:list.message, 
            items:list.items, 
            selected:list.selected
        })">{{list.title}}</h3>
        <h3 class="dones">({{list.items.filter((i) => {return i.done==true}).length}} / {{list.items.length}} done)</h3>
        <p>{{list.message}}</p>
        <router-link :to="{path: `/lists/${index}`}">
            <button class="link">
                Go to the List
            </button>
        </router-link>
        <button class="delete" v-on:click="deleteList($event, list)">
            X
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
    name: 'MenuList',
    components: {},
    props: {
        index: Number,
        list: Object,
        deleteList: {
            type: Function,
            required: true,
        },
        updateList: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {}
    },
    methods: {}
})
</script>

<style scoped lang="scss">
.menulist {
    position: relative;
    background-color: #007e69;
    width: 70%;
    margin: auto;
    overflow: hidden;
    border-radius: 5px;
    margin-top: 20px;

    -webkit-box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
    -moz-box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
    box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
}
h3 {
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 0px;
    padding-right: 5px;
}
p {
    padding-left: 10px;
    padding-right: 10px;
    max-height: 30px;
    color: #dbd9d9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.link {
    width: 100%;
    border: none;
    background-color: #dbd9d9;
    color: #007e69;
    height: 30px;
    font-size: 0.9em;
    font-weight: bold;
}
.delete {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30px;
    height: 30px;
    border: none;
    background-color: #dbd9d9;
    color: #014945;
    font-weight: bold;
    border-radius: 3px;
}
.delete:focus, 
h3:focus {
    outline: none;
}
.dones {
    font-size: 0.9em;
    font-style: italic;
    color: #dbd9d9;
}
</style>