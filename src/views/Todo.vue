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
    data: function() {
        return {
            id: 1,
            icon: 'Icon',
            title: 'List Title',
            message:
                'Task List text... Lorem ipsum dolor sit amet consectetur adipisicing elit. elit. Deleniti nam temporibus distinctio minima est facilis quo rerum, commodi modi vel exercitationem nemo repellendus sunt eos reiciendis consectetur? Aliquid, maiores quod',
            items: [
                {
                    id: 0,
                    icon: '1.',
                    title: 'Idée',
                    message:
                        'Faire une TodoList en Vue.js, ajouter/supprimer/modifier/valider les tâches...',
                    done: false,
                },
                {
                    id: 1,
                    icon: '2.',
                    title: 'Structure',
                    message:
                        'orem ipsum dolor sit amet consectetur adipisicing elit.',
                    done: false,
                },
                {
                    id: 2,
                    icon: '3.',
                    title: 'Design',
                    message:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. elit. Deleniti nam temporibus distinctio.',
                    done: false,
                },
            ],
            selected: 0,
        }
    },
    methods: {
        add(event: Event, title: String, items: Array<Object>) {
            items.push({
                icon: '',
                title: title,
                message: '',
                done: false,
            })
        },
        remove(event: Event, item: Object, items: Array<Object>) {
            items.splice(items.indexOf(item), 1)
        },
        read(event: Event) {
            const fs = require('fs')
            fs.readFile('items.txt', (err: Error, data: Object) => {
                if (err) {
                    throw err
                }
                console.log(data.toString())
            })
        },
        save(event: Event) {
            const data = JSON.stringify('...')
            const fs = require('fs')
            try {
                fs.writeFileSync('items.txt', data, 'utf-8')
            } catch (e) {
                alert('Failed to save the file !')
            }
        },
    },
}
</script>
