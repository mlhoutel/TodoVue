<template>
    <div id="todo-list">
        <TodoList
            :id="id"
            :icon="icon"
            :title="title"
            :message="message"
            :items="items"
            :selected="selected"
            :createItem="createItem"
            :readItem="readItem"
            :updateItem="updateItem"
            :deleteItem="deleteItem"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoList from '@/components/TodoList.vue'
import TodoListItem from '@/components/TodoListItem.vue'

export default {
    components: {
        TodoList,
        TodoListItem,
    },
    data() {
        return {
            id: 0,
            icon: 'Icon',
            title: 'List Title',
            message:
                'Task List text...',
            items: [],
            selected: 0,
        }
    },
    methods: {
        createItem(event: Event, title: String, items: Array<Object>) {
            if (title == undefined) { return }
            if (title.length < 1) { return }
            let item = { icon: '', title: title, message: '', done: false }
            const axios = require('axios')
            axios.post(`http://localhost:3023/lists/${0}/items`, item)
            /* Update Current */
            items.push(item)
        },
        readItem(items: Array<Object>) {
            const axios = require('axios')
            items.splice(0, items.length)
            axios.get(`http://localhost:3023/lists/${0}/items`).then(function(response : any){
                let newitems : Array<any> = response.data
                for (let newitem of Object.values(newitems)) {
                    items.push(newitem)
                }
            })
        },
        updateItem(event: Event, item: Object, value: Object, items: Array<Object>) {
            const axios = require('axios')
            let index = items.indexOf(item)
            if (index < 0) { return }
            axios.put(`http://localhost:3023/lists/${0}/items/${index}`, value)
            
            /* Update Current */
            items[items.indexOf(item)] = value
        },
        deleteItem(event: Event, item: Object, items: Array<Object>) {
            const axios = require('axios')
            let index = items.indexOf(item)
            axios.delete(`http://localhost:3023/lists/${0}/items/${index}`)

            /* Update Current */
            items.splice(items.indexOf(item), 1)
        }
    },
}
</script>
