<script>
    export default {
        name: "rpreview",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            handleClose: {
                type: Function,
                default: () => {}
            },
            work: {
                type: Object,
                default: () => ({})
            }
        },
        computed: {
            previewUrl () {
                console.log(this.work)
                return `http://yima.hazer.top/h5/?clientId=${this.work.clientId}`
            }
        },
        data: () => ({
            confirmLoading: false
        }),
        methods: {
            handleCancel (e) {
                console.log('Clicked cancel button')
                this.handleClose()
            },
            postMessage2Iframe (message) {
                let iframe = document.getElementById('iframe-for-preview')
                if (!iframe) return
                const iframeWin = iframe.contentWindow
                iframeWin.postMessage(message, window.location.origin)
            }
        },
        render(h) {
            return (
                <a-modal
                    visible={this.visible}
                    confirmLoading={this.confirmLoading}
                    onCancel={this.handleCancel}
                    width="30%"
                >
                    <div className="preview-wrapper">
                        <a-row gutter={20}>
                            <a-col span={14}>
                                <div className="phone-wrapper" style={{transform: 'scale(0.9)'}}>
                                    <div className="phone">
                                        <iframe
                                            id="iframe-for-preview"
                                            src={this.previewUrl}
                                            frameBorder="0"
                                            style="height: 568px;width: 320px;"
                                        ></iframe>
                                    </div>
                                </div>
                            </a-col>
                            <a-col span = {6}>
                                <div className="pre-desc" style="position: absolute;font-size: 12px;top:40%">
                                    <h3 style="color:red;">预览说明：</h3>
                                    <p>1、部分组件尚未实现预览；</p>
                                    <p>2、组件尚未点击效果；</p>
                                    <p>3、预览仅供参考，不代表真机效果；</p>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                </a-modal>
            )
        }
    }
</script>

<style lang="scss">
    .preview-wrapper {
        position: relative;
        min-height: 480px;

        .phone-wrapper {
            position: absolute;
            box-sizing: content-box;
            .phone {
                position: absolute;
                width: 320px;
                height: 568px;

                display: inline-block;
                background: #fff;
                box-sizing: content-box;
                border-top: 10px solid #f6f6f6;
                border-left: 10px solid #f6f6f6;
                border-right: 10px solid #f6f6f6;
                border-bottom: 20px solid #f6f6f6;
                border-radius: 20px;
                -webkit-transform-origin: 100% 0;
                transform-origin: 100% 0;
                -webkit-transform: scale(1);
                transform: scale(1);

                .float-ctrl-panel {
                    position: absolute;
                    top: 100px;
                    right: -40px;

                    .page-controller {
                        display: block;
                        cursor: pointer;
                        width: 30px;
                        height: 80px;
                        border-top-right-radius: 5px;
                        border-bottom-right-radius: 5px;
                        background: #2096f9;
                        font-size: 12px;
                        text-align: center;
                        border: 1px solid #2096f9;
                        color: #fff;
                        // position: absolute;
                        padding: 14px 8px;
                        margin-top: 12px;
                        // margin-top: -50px;
                    }

                }
            }
        }
    }

    .pre-desc {
        position: absolute;
        left: 100%;
        top: 30%;
        width: 200px;
        height: 250px;
        padding: 10px;
        background-color: #fff;
        font-size: 12px;

        > p {
            margin: 0;
            text-align: left;
            line-height: 1.5;
        }
    }

</style>