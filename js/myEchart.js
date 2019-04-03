$(function () {
    var myChart02 = echarts.init(document.getElementById('main02'));
    var option02 = {
        color:['#1882ff','#fd9228','#f13b47'],
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            orient : 'vertical',
            x : '-200',
            data:['经营','股权','变更']
        },
        polar : [
            {
                indicator : [
                    { text: '失信被执行人', max: 10},
                    { text: '曝光台', max: 10},
                    { text: '被执行人信息', max: 10},
                    { text: '高危案由', max: 10},
                    { text: '开庭公告', max: 10},
                    { text: '立案公告', max: 10},
                    { text: '裁判文书', max: 10}
                ]
            }
        ],
        calculable : true,
        series : [
            {
                name: '警报vs关注vs负向',
                type: 'radar',
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data : [
                    {
                        value : [0, 0 ,0, 0, 0, 2, 8],
                        name : '关注'
                    },  {
                        value : [0, 0, 6, 4, 0,0],
                        name : '负向'
                    },
                    {
                        value : [3, 2, 4, 4, 0, 0],
                        name : '警报'
                    }
                ]
            }
        ]
    };
})