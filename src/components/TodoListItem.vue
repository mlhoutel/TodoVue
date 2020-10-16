<template>
    <li class="todolistitem">
        <div>
            <h3>{{ item.icon }} {{ item.title }}</h3>
            <p v-if="item.message.trim() !== ''">{{ item.message }}</p>
            <button class="validate">Validate</button>
            <button class="delete">X</button>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TodoListItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
})
</script>

<style scoped lang="scss">
.todolistitem {
    position: relative;
    background-color: #007e69;
    width: 70%;
    margin: auto;
    overflow: hidden;
    border-radius: 5px;
    margin-top: 20px;
}
div {
}
h3 {
}
p {
    color: #dbd9d9;
}
.validate {
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
.validate:focus,
.delete:focus {
    outline: none;
}
</style>
