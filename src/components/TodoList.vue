<template>
    <div class="todolist">
        <div class="intro">
            <h1>{{ icon }} - {{ title }}</h1>
            <p>{{ message }}</p>
        </div>
        <form v-on:submit.prevent="addNewTodo">
            <label for="new-todo">Add a task</label>
            <input
                v-model="newTodoText"
                id="new-todo"
                placeholder="Ex. feed the cat"
            />
            <button>Add</button>
        </form>
        <ul>
            <TodoListItem
                v-for="(item, index) in items"
                :item="item"
                :index="index"
                :key="item.id"
            />
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoListItem from '@/components/TodoListItem.vue'

export default defineComponent({
    name: 'TodoList',
    components: {
        TodoListItem,
    },
    props: {
        id: Number,
        icon: String,
        title: String,
        message: String,
        items: {
            type: Array,
            default: () => [],
        },
    },
})
</script>

<style scoped lang="scss">
* {
    padding: 0px;
    margin: 0px;
}
.todolist {
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
}
.intro h1 {
    color: #dbd9d9;
}
.intro p {
    color: #dbd9d9;
    margin: auto;
    text-align: justify;
    width: 70%;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 10px;
    border-left: 2px solid #014945;
}

form {
    position: relative;
    padding-top: 20px;
    margin: 10px auto auto auto;
    width: 300px;
    display: inline-block;
}
label {
    position: absolute;
    display: block;
    top: 0px;
    left: 10px;
    font-size: 1rem;
    color: #dbd9d9;
    font-style: italic;
}
input {
    width: auto;
    height: 40px;
    background-color: #dbd9d9;
    color: #007e69;
    padding-left: 20px;
    border-radius: 5px 0px 0px 0px;
}
input::placeholder {
    color: #007e69;
}
button {
    width: 100px;
    height: 43px;
    background-color: #007e69;
    color: #dbd9d9;
    font-size: 1em;
    font-weight: bold;
}

input,
button {
    border: none;
    border-bottom: 2px solid #007e69;
}
input:focus,
button:focus {
    outline: none;
}
</style>
