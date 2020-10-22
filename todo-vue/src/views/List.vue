<template>
    <div id="todo-list">
        <TodoList
            :icon="icon"
            :title="title"
            :message="message"
            :items="items"
            :selected="selected"
            :createItem="createItem"
            :readItem="readItem"
            :updateItem="updateItem"
            :deleteItem="deleteItem"
            :updateList="updateList"
            :getSelected="getSelected"
            :setSelected="setSelected"
        />
    </div>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent } from 'vue'
import TodoList from '@/components/TodoList.vue'
import TodoListItem from '@/components/TodoListItem.vue'

const axios = require('axios')

export default {
    components: {
        TodoList,
        TodoListItem,
    },
    props: ['listId'],
    data() {
        return {
            id: this.listId,
            icon: '',
            title: '',
            message:'',
            items: [],
            selected: 0,
        }
    },
    mounted() {
        this.readList()
    },
    methods: {
        readList() {
            const _this = this
            axios.get(`http://localhost:3023/lists/${_this.listId}`).then(function(response : any){
                let newlist : any = response.data
                _this.icon = newlist['icon']
                _this.title = newlist['title']
                _this.message = newlist['message']
                _this.items = newlist['items']
                _this.selected = newlist['selected']
            })
        },
        updateList(event: Event, icon: String, title: String, message: String, selected: Number) {
            const Id = this.listId
            axios.get(`http://localhost:3023/lists/${Id}/items`).then(function(response : any){
                axios.put(`http://localhost:3023/lists/${Id}`, {
                    "icon": icon, 
                    "title": title, 
                    "message": message, 
                    "items": response.data,
                    "selected": selected
                })
            })
        },
        createItem(event: Event, title: String, items: Array<Object>) {
            if (title == undefined) { return }
            if (title.length < 1) { return }
            let item = { icon: '', title: title, message: '', done: false }
            axios.post(`http://localhost:3023/lists/${this.listId}/items`, item)
            /* Update Current */
            items.push(item)
        },
        readItem(items: Array<Object>) {
            items.splice(0, items.length)
            axios.get(`http://localhost:3023/lists/${this.listId}/items`).then(function(response : any){
                let newitems : Array<any> = response.data
                for (let newitem of Object.values(newitems)) {
                    items.push(newitem)
                }
            })
        },
        updateItem(event: Event, item: Object, value: Object, items: Array<Object>) {
            let index = items.indexOf(item)
            if (index < 0) { return }
            axios.put(`http://localhost:3023/lists/${this.listId}/items/${index}`, value)
            
            /* Update Current */
            items[items.indexOf(item)] = value
        },
        deleteItem(event: Event, item: Object, items: Array<Object>) {
            let index = items.indexOf(item)
            axios.delete(`http://localhost:3023/lists/${this.listId}/items/${index}`)

            /* Update Current */
            items.splice(items.indexOf(item), 1)
        },
        getSelected(event: Event, value: number): boolean {
            return this.selected == value
        },
        setSelected(event: Event, value: number) {
            this.updateList(null, this.icon, this.title, this.message, value)
           
            /* Update Current */
            this.selected = value
        }
    },
}
</script>