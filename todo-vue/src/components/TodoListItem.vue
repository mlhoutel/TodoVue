<template>
    <li class="todolistitem" v-bind:class="{ done: item.done }">
        <div>
            <h3 v-html="item.icon"></h3>
            <h3
                contenteditable
                spellcheck="false"
                v-on:blur="
                    updateItem($event, item, {
                        icon: item.icon,
                        message: item.message,
                        title: $event.target.innerText,
                        done: item.done,
                    })
                "
            >
                {{ item.title }}
            </h3>
            <p
                contenteditable
                spellcheck="false"
                :class="{ emptymessage: isEmpty($event, item.message) }"
                v-html="item.message "
                v-on:blur="
                    updateItem($event, item, {
                        icon: item.icon,
                        message: $event.target.innerHTML,
                        title: item.title,
                        done: item.done,
                    })
                "
            >
            </p>
            <button
                class="validate"
                v-if="item.done"
                v-on:click="updateItem($event, item, {
                        icon: item.icon,
                        message: item.message,
                        title: item.title,
                        done: false,
                    })"
            >
                Cancel
            </button>
            <button class="validate" v-else v-on:click="updateItem($event, item, {
                        icon: item.icon,
                        message: item.message,
                        title: item.title,
                        done: true,
                    })">
                Validate
            </button>
            <button class="delete" v-on:click="deleteItem($event, item)">
                X
            </button>
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
        updateItem: {
            type: Function,
            required: true,
        },
        deleteItem: {
            type: Function,
            required: true,
        },
    },
    methods: {
        isEmpty(event: Event, message: String): Boolean {
            return message.trim() === ''
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

    -webkit-box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
    -moz-box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
    box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
}
.done {
    filter: hue-rotate(10deg) grayscale(60%) contrast(80%);
}
h3 {
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 0px;
    padding-right: 15px;
}
p {
    color: #dbd9d9;
}
.emptymessage {
    margin: 5px;
    height: 5px;
    overflow: hidden;
}
.emptymessage:focus {
    height: auto;
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
.delete:focus,
h3:focus,
p:focus {
    outline: none;
}
</style>
