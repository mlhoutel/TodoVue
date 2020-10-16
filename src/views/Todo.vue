<template>
    <div id="todo-list">
        <TodoList
            :id="id"
            :icon="icon"
            :title="title"
            :message="message"
            :items="items"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoList from '@/components/TodoList.vue'
import TodoListItem from '@/components/TodoListItem.vue'

export default {
    el: '#todo-list',
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
                },
                {
                    id: 1,
                    icon: '2.',
                    title: 'Structure',
                    message:
                        'orem ipsum dolor sit amet consectetur adipisicing elit.',
                },
                {
                    id: 2,
                    icon: '3.',
                    title: 'Design',
                    message:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. elit. Deleniti nam temporibus distinctio.',
                },
            ],
        }
    },
}
</script>
