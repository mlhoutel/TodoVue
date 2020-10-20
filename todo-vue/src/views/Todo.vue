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
                'Task List text... Lorem ipsum dolor sit amet consectetur adipisicing elit. elit. Deleniti nam temporibus distinctio minima est facilis quo rerum, commodi modi vel exercitationem nemo repellendus sunt eos reiciendis consectetur? Aliquid, maiores quod',
            items: [
                    {
                        "id": "0",
                        "icon": "1",
                        "title": "Idée",
                        "message": "Faire une TodoList en Vue.js, ajouter/supprimer/modifier/valider les tâches...",
                        "done": "false"
                    },

                ],
            selected: 0,
        }
    },
    methods: {
        add(event: Event, title: String, items: Array<Object>) {
            if (title == undefined) {
                return
            }
            if (title.length < 1) {
                return
            }
            items.push({
                icon: 'N.',
                title: title,
                message: '',
                done: false,
            })
        },
        remove(event: Event, item: Object, items: Array<Object>) {
            items.splice(items.indexOf(item), 1)
        },
        editItem(
            event: Event,
            item: Object,
            value: Object,
            items: Array<Object>
        ) {
            items[items.indexOf(item)] = value
            this.save(event, items)
            
            const axios = require('axios')
            axios.put('http://localhost:3023/items/'+items.indexOf(item), JSON.stringify(item)).then(function(response : any){
                console.log(response.data)
            })
        },
        read(items: Array<Object>) {
            const axios = require('axios')
            axios.get('http://localhost:3023/items').then(function(response : any){
                console.log(response.data)
            })
        },
        save(event: Event, items: Array<Object>) {
            const axios = require('axios')
            //axios.post('http://localhost:3023/items').then(function(response : any){ })
        },
    },
}
</script>
