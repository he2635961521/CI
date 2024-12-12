import { useEffect, useRef } from "react";
import "./App.less"
import * as echarts from 'echarts';
import 'echarts/lib/component/dataZoom'


const option = {
  title: {
    text: 'Echarts example',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: ['1th', '2th', '3th', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21th', '22th', '23th', '24th', '25th'],
    boundaryGap: false,
    axisLabel: {
      showMinLabel: true,
      interval: 5,
    }
  },
  yAxis: {
    type: 'value',
    min: 'dataMin',
  },
  series: [
    {
      markPoint: {
        symbol: 'arrow'
      },
      data: [50, 230, 224, {
        value: 300,
        label: {
          position: 'right',
          distance: 120,
          show: true,
          padding: [5, 10, 5, 10],
          borderWidth: 1,
          borderColor: 'inherit',
          borderRadius: 5,
          formatter: '最大回撤：{c}%',
        },
        labelLine: {
          show: true,
          inlineStyle: {
            cap: 'square',
            join: 'round',
            width: 1,
          }
        }
      }, 135, 147, 260, 230, 224, 218, 135, 147, {
          value: 250,
        }, 230, 224, 218, 135, 147, 260, 230, 224, 218, 135, 147, 260],
      type: 'scatter',
    }
  ],
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      // 启用轴指示器
      type: 'shadow',
      // 设置指示器箭头的样式
      axis: 'auto',
      // 设置指示器箭头的颜色
      shadowColor: 'rgba(150,150,150,0.3)',
      // 设置指示器箭头的宽度
      shadowBlur: 2
    }
  },
};

function App() {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myChart = echarts.init(domRef.current, null, {
      width: '343px',
      height: '340px'
    });
    myChart.setOption(option);

    return () => {
      myChart.dispose();
    }
  }, [])

  return (
    <div className="app">
      <div ref={domRef} className="container"></div>
    </div>
  );
}

export default App;