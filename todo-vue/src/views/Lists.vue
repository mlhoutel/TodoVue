<template>
    <MenuLists :lists="lists" :deleteList="deleteList" :createList="createList" :updateList="updateList" />
</template>


<script lang="ts">
//@ts-nocheck
import { defineComponent } from 'vue'
import MenuLists from '@/components/MenuLists.vue'
import MenuList from '@/components/MenuList.vue'

const axios = require('axios')

export default {
    components: {
        MenuLists,
        MenuList,
    },
    data() {
        return {
            lists: []
        }
    },
    mounted() {
        this.readList()
    },
    methods: {
        createList(event: Event, title: String){
            if (title == undefined) { return }
            if (title.length < 1) { return }
            let list = { 
                icon: '', 
                title: title, 
                message: '', 
                items: [],
                selected: 0 
            }
            axios.post(`http://localhost:3023/lists`, list)
            /* Update Current */
            this.lists.push(list)
        },
        readList() {
            const _this = this
            axios.get(`http://localhost:3023/lists`).then(function(response : any){
                let newlists : Array<any> = response.data
                for (let newlist of Object.values(newlists)) {
                    _this.lists.push(newlist)
                }
            })
        },
        deleteList(event: Event, list: Object, lists: Array<Object>) {
            let index = lists.indexOf(list)
            axios.delete(`http://localhost:3023/lists/${index}`)

            /* Update Current */
            lists.splice(lists.indexOf(list), 1)
        },
        updateList(event: Event, Id: Number, list: Object, lists: Array<Object>) {
            axios.get(`http://localhost:3023/lists/${Id}/items`).then(function(response : any){
                axios.put(`http://localhost:3023/lists/${Id}`, {
                    "icon": list.icon, 
                    "title": list.title, 
                    "message": list.message, 
                    "items": response.data,
                    "selected": list.selected
                })
            })
        }
    }
}
</script>