<template>
    <div id="todo-list">
        <TodoList
            :id="id"
            :icon="icon"
            :title="title"
            :message="message"
            :items="items"
            :selected="selected"
            :add="add"
            :remove="remove"
            :editItem="editItem"
            :read="read"
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
    data: function() : any {
        return {
            id: 1,
            icon: 'Icon',
            title: 'List Title',
            message:
                'Task List text...',
            items: [],
            selected: 0,
        }
    },
    methods: {
        add(event: Event, title: String, items: Array<Object>) {
            if (title == undefined) { return }
            if (title.length < 1) { return }
            let item = { icon: '', title: title, message: '', done: false }
            const axios = require('axios')
            axios.post('http://localhost:3023/items', item)

            /* Update Current */
            items.push(item)
        },
        remove(event: Event, item: Object, items: Array<Object>) {
            const axios = require('axios')
            let index = items.indexOf(item)
            axios.delete('http://localhost:3023/items/'+index)

            /* Update Current */
            items.splice(items.indexOf(item), 1)
        },
        editItem(
            event: Event,
            item: Object,
            value: Object,
            items: Array<Object>
        ) {
            const axios = require('axios')
            let index = items.indexOf(item)
            if (index < 0) { return }
            axios.put('http://localhost:3023/items/'+index, value)
            
            /* Update Current */
            items[items.indexOf(item)] = value
        },
        read(items: Array<Object>) {
            const axios = require('axios')
            items.splice(0, items.length)
            axios.get('http://localhost:3023/items').then(function(response : any){
                let newitems : Array<any> = response.data["items"]
                for (let newitem of Object.values(newitems)) {
                    items.push(newitem)
                }
            })
        }
    },
}
</script>
