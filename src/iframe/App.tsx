import { useEffect, useRef } from "react";
// const data = {
//   type: 'cms-operation-init',
//   list: [
//     { label: '沪深顶部跑马灯/hs_top_notice', value: 'hs_top_notice' },
//     { label: '自选股顶部运营位/zxg_top', value: 'zxg_top' },
//     { label: '全球顶部跑马灯/global_top_notice', value: 'global_top_notice' },
//     { label: '行情基金跑马灯/fund_top_notice', value: 'fund_top_notice' },
//   ]
// }

const data = {
  type: "cms-operation-init",
  list: [
    { label: "启动运营弹窗/startup", value: "startup" },
    // { label: '发现页/banner2020', value: 'banner2020' },
    // { label: '开机广告/boot-advertising', value: 'boot-advertising' },
  ],
};

const url =
  "http://testcms.gf.com.cn/#/app/gf-stockindex/trade-menu/popup?platform_source=oms";

function App() {
  const framRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.addEventListener("message", postMessageHandle);
  }, []);

  const postMessageHandle = (message: MessageEvent) => {
    if (message.data.type !== "cms-operation-ready") return;
    console.log(message);
    framRef.current?.contentWindow?.postMessage(
      data,
      "http://testcms.gf.com.cn",
    );
  };

  return (
    <div className="c">
      <iframe
        ref={framRef}
        src={url}
        sandbox="allow-scripts allow-same-origin"
        style={{ border: 0, width: "100%", height: "100%" }}
      ></iframe>
    </div>
  );
}

export default App;
