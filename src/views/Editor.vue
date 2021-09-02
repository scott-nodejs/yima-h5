<script>
    import AppMain from 'core/yima/main'
    // import CoreEditor from '@luban-h5/core-editor'
    export default {
        render () {
            return (
                <AppMain workId={this.$route.params.workId} />
            )
        }
    }
</script>
