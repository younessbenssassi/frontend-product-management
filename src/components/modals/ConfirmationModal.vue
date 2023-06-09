<template>
    <el-dialog
            title="Confirmation model"
            width="30%"
            :before-close="close"
            :visible="true"
        >
            <span>{{ content }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click.prevent="close">Close</el-button>
                <el-button type="primary" @click.prevent="confirmed">Confirm</el-button>
            </span>
        </el-dialog>
</template>
<script>

export default {
    name: 'ConfirmationModal',
    props:{
        content:{
            type:String,
            required:true
        }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        confirmed(){
            this.$emit('confirmed');
        }
    }
   
}
</script>