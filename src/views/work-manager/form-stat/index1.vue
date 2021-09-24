<template>
    <a-table :columns="columns" :data-source="this.computedWorks" bordered>
        <template
                v-for="col in ['company', 'phone','nickname', 'address']"
                :slot="col"
                slot-scope="text, record, index"
        >
            <div :key="col">
                <a-input
                        v-if="record.editable"
                        style="margin: -5px 0"
                        :value="text"
                        @change="e => handleChange(e.target.value, record.key, col)"
                />
                <template v-else>
                    {{ text }}
                </template>
            </div>
        </template>
        <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Save</a>
          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
                <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
        </span>
            </div>
        </template>
    </a-table>
</template>
<script>
    import {mapActions, mapState} from "vuex";

    const columns = [
        {
            title: '门店名称',
            dataIndex: 'name',
            width: '25%',
            scopedSlots: { customRender: 'company' },
        },
        {
            title: '电话',
            dataIndex: 'phone',
            width: '15%',
            scopedSlots: { customRender: 'phone' },
        },
        {
            title: '联系人',
            dataIndex: 'nickname',
            width: '20%',
            scopedSlots: { customRender: 'nickname' },
        },
        {
            title: '地址',
            dataIndex: 'address',
            width: '30%',
            scopedSlots: { customRender: 'address' },
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '20%',
            scopedSlots: { customRender: 'operation' },
        },
    ];
    export default {
        data() {
            return {
                columns,
                editingKey: '',
            };
        },
        computed: {
            ...mapState('client', ['clientList']),
            computedWorks: {
                get() {
                    return this.clientList.map(w => ({
                        key: w.id.toString(),
                        name: w.name,
                        phone: w.phone || '',
                        nickname: w.nickname || '',
                        address: w.address || ''
                    }))
                },
                set(newVal){
                    this.computedWorks = newVal
                }
            }
        },
        created () {
            this.fetchClient()
        },
        methods: {
            ...mapActions('client', [
                'fetchClient'
            ]),
            handleChange(value, key, column) {
                const newData = [...this.data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    target[column] = value;
                    this.data = newData;
                }
            },
            edit(key) {
                console.log(key)
                const newData = [...this.computedWorks];
                const target = this.computedWorks.filter(item => key === item.key)[0];
                this.editingKey = key;
                if (target) {
                    target.editable = true;
                    console.log(this.computedWorks)
                }
            },
            save(key) {
                const newData = [...this.clientList];
                const newCacheData = [...this.cacheData];
                const target = newData.filter(item => key === item.key)[0];
                const targetCache = newCacheData.filter(item => key === item.key)[0];
                if (target && targetCache) {
                    delete target.editable;
                    this.data = newData;
                    Object.assign(targetCache, target);
                    this.cacheData = newCacheData;
                }
                this.editingKey = '';
            },
            cancel(key) {
                const newData = [...this.computedWorks];
                const target = newData.filter(item => key === item.key)[0];
                this.editingKey = '';
                if (target) {
                    Object.assign(target, this.computedWorks.filter(item => key === item.key)[0]);
                    delete target.editable;
                    this.data = newData;
                }
            },
        },
    };
</script>
<style scoped>
    .editable-row-operations a {
        margin-right: 8px;
    }
</style>