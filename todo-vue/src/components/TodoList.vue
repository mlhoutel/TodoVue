<template>
    <div class="todolist">
        <div class="intro">
            <h1 v-html="icon"></h1>
            <h1 contenteditable spellcheck="false">{{ title }}</h1>
            <p contenteditable spellcheck="false">{{ message }}</p>
        </div>
        <form v-on:submit.prevent>
            <label for="new-todo">Add a task</label>
            <input
                v-model="NewTitle"
                id="new-todo"
                placeholder="Ex. feed the cat"
            />
            <!-- prettier-ignore -->
            <button v-on:click="SelfAdd($event, NewTitle)">
                Add
            </button>
        </form>
        <div class="selector">
            <button
                class="select-all"
                :class="{ selected: getSelected($event, 0, selected) }"
                v-on:click="setSelected($event, 0, selected)"
            >
                All
            </button>
            <button
                class="select-todo"
                :class="{ selected: getSelected($event, 1, selected) }"
                v-on:click="setSelected($event, 1, selected)"
            >
                Todo
            </button>

            <button
                class="select-done"
                :class="{ selected: getSelected($event, 2, selected) }"
                v-on:click="setSelected($event, 2, selected)"
            >
                Done
            </button>
        </div>
        <ul>
            <TodoListItem
                v-for="(item, index) in Items($event)"
                :item="item"
                :index="index"
                :key="item.id"
                :remove="SelfRemove"
                :edit="SelfEditItem"
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
        add: {
            type: Function,
            required: true,
        },
        remove: {
            type: Function,
            required: true,
        },
        editItem: {
            type: Function,
            required: true,
        },
        read: {
            type: Function,
            required: true,
        }
    },
    data() {
        return {
            Selected: this.selected,
            NewTitle: '',
        }
    },
    mounted: function() {
        this.read(this.items)
        console.log(this.items)
    },
    methods: {
        SelfRemove(event: Event, item: Object) {
            this.remove(event, item, this.items)
        },
        SelfAdd(event: Event, title: String) {
            this.add(event, title, this.items)
            this.NewTitle = ''
        },
        SelfEditItem(event: Event, item: Object, value: Object) {
            this.editItem(event, item, value, this.items)
        },
        getSelected(event: Event, value: number): boolean {
            return this.Selected == value
        },
        setSelected(event: Event, value: number) {
            this.Selected = value
        },
        Items(event: Event) {
            if (this.getSelected(event, 0)) {
                return this.items
            } else if (this.getSelected(event, 1)) {
                return this.items.filter((item) => {
                    if (item['done'] === false) {
                        return item
                    }
                })
            } else {
                return this.items.filter((item) => {
                    if (item['done'] === true) {
                        return item
                    }
                })
            }
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
    border-top: 5px solid #007e69;
    background-color: #dbd9d9;
    color: #007e69;
    font-size: 0.8em;
    font-weight: bold;
}

.selector button:focus,
h1:focus,
p:focus {
    outline: none;
}

button.selected {
    background-color: #007e69;
    color: #dbd9d9;
}
</style>
