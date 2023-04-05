import * as echarts from "echarts/core";
import {
    TooltipComponent,
    type TooltipComponentOption,
    TitleComponent,
    type TitleComponentOption,
    LegendComponent,
    type LegendComponentOption,
} from "echarts/components";
import { PieChart, type PieSeriesOption } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsType } from "echarts/core";

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
]);

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | LegendComponentOption
    | PieSeriesOption
>;
export default function (
    element: HTMLElement,
    theme: string,
    data: ApiStatisticsToday
) {
    const echart: EChartsType = echarts.init(element, theme);
    const option: EChartsOption = {
        title: {
            text: "今日学习情况",
            subtext: `今天学习了${Math.floor(data.learn_duration / 60)}分钟`,
            left: "left",
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            bottom: "5%",
            left: "center",
        },
        series: [
            {
                name: "每日单词学习情况",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: data.unlearn_amount, name: "未学习" },
                    { value: data.learned_amount, name: "已学习" },
                    { value: data.simple_amount, name: "简单" },
                    { value: data.remember_amount, name: "记住" },
                    { value: data.forget_amount, name: "忘记" },
                ],
            },
        ],
    };
    echart.setOption(option);
    return echart;
}
