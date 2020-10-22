<template>
    <div class="todolist">
        <router-link class="return" to="/lists">
            <img src="../assets/back.svg">
        </router-link>
        <div class="intro">
            <h1 contenteditable v-html="icon" v-on:blur="updateList($event, $event.target.innerText, title, message, selected)"></h1>
            <h1 contenteditable spellcheck="false" v-on:blur="updateList($event, icon, $event.target.innerText, message, selected)">{{ title }}</h1>
            <p contenteditable spellcheck="false" v-on:blur="updateList($event, icon, title, $event.target.innerText, selected)">{{ message }}</p>
        </div>
        <form v-on:submit.prevent>
            <label for="new-todo">Add a task</label>
            <input
                v-model="NewTitle"
                id="new-todo"
                placeholder="Ex. feed the cat"
            />
            <button v-on:click="SelfCreateItem($event, NewTitle)">
                Add
            </button>
        </form>
        <div class="selector">
            <button
                class="select-all"
                :class="{ selected: getSelected($event, 0) }"
                v-on:click="setSelected($event, 0)"
            >
                All
            </button>
            <button
                class="select-todo"
                :class="{ selected: getSelected($event, 1) }"
                v-on:click="setSelected($event, 1)"
            >
                Todo
            </button>

            <button
                class="select-done"
                :class="{ selected: getSelected($event, 2) }"
                v-on:click="setSelected($event, 2)"
            >
                Done
            </button>
        </div>
        <ul>
            <TodoListItem
                v-for="(item, index) in SelfReadItem($event)"
                :item="item"
                :index="index"
                :key="item.id"
                :deleteItem="SelfDeleteItem"
                :updateItem="SelfUpdateItem"
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
        selected: Number,
        items: {
            type: Array as () => Array<any>,
            default: () => [],
        },
        createItem: {
            type: Function,
            required: true,
        },
        readItem: {
            type: Function,
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
        updateList: {
            type: Function,
            required: true,
        },
        getSelected: {
            type: Function,
            required: true,
        },
        setSelected:  {
            type: Function,
            required: true,
        }
    },
    data() {
        return {
            NewTitle: '',
        }
    },
    methods: {
        SelfCreateItem(event: Event, title: String) {
            this.createItem(event, title, this.items)
            this.NewTitle = ''
        },
        SelfReadItem(event: Event) {
            if (this.getSelected(event, 0)) {
                return this.items
            } else if (this.getSelected(event, 1)) {
                return this.items.filter((item) => {
                    if (item['done'] === false) { return item }
                })
            } else {
                return this.items.filter((item) => {
                    if (item['done'] === true) { return item }
                })
            }
        },
        SelfUpdateItem(event: Event, item: Object, value: Object) {
            this.updateItem(event, item, value, this.items)
        },
        SelfDeleteItem(event: Event, item: Object) {
            this.deleteItem(event, item, this.items)
        },
        SelfGetSelected(event: Event, value: number): boolean {
            return this.getSelected(event, value)
        },
        SelfSetSelected(event: Event, value: number) {
            this.setSelected(event, value)
        }
    },
})
</script>

<style scoped lang="scss">
* {
    padding: 0px;
    margin: 0px;
}
.todolist {
    position: relative;
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

.selector {
    overflow: hidden;
    border-radius: 0px 0px 10px 10px;
    width: 300px;
    margin: auto;
    height: 30px;
    padding: 0px;

    -webkit-box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
    -moz-box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
    box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.49);
}
.selector button {
    display: inline-block;
    width: 33.33%;
    height: 30px;
    border: none;
    border-top: 2px solid #007e69;
    background-color: #dbd9d9;
    color: #007e69;
    font-size: 0.8em;
    font-weight: bold;
}

.selector button:focus,
.return:focus,
h1:focus,
p:focus {
    outline: none;
}
button.selected {
    background-color: #007e69;
    color: #dbd9d9;
}
.return {
    position: absolute;
    left: 0px;
    padding: 5px;
    color: #dbd9d9;
    border: none;
    background-color: #007e69;
}

.return img {
    height: 50px;
    filter: invert(0.90);
}
</style>
