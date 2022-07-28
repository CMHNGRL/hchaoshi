const NodeMediaServer = require('node-media-server');
require('../db/connect')
require('./ws')
let Live = require('../db/model/live')
const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8000,
        allow_origin: '*'
    }
};
const nms = new NodeMediaServer(config)
nms.run();
nms.on('prePublish', async(id, StreamPath) => {
        let session = nms.getSession(id);
        //该推流地址为
        let publishUrl = "rtmp://localhost" + StreamPath
            //根据推流地址获取直播间
        let live = await Live.findOne({ publishUrl })
            //如果该直播间不存在或者直播未开启
        if (!live || live.onLive == 0) return session.reject();
        await live.save()
    })
    //断开连接
nms.on('donePublish', async(id, StreamPath) => {
    //该推流地址为
    let publishUrl = "rtmp://localhost" + StreamPath
        //关闭直播间
    await Live.findOneAndUpdate({ publishUrl }, { onLive: 0 })
});