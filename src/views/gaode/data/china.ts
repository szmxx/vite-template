/*
 * @Author: cola
 * @Date: 2022-12-07 15:50:08
 * @LastEditors: cola
 * @Description:
 */
const provinces = [
  { NAME_CHN: '北京', center: [116.405285, 40.404989] },
  { NAME_CHN: '天津', center: [117.590182, 39.125596] },
  { NAME_CHN: '河北', center: [115.502461, 38.045474] },
  { NAME_CHN: '山西', center: [112.249248, 37.857014] },
  { NAME_CHN: '内蒙古', center: [110.670801, 41.018311] },
  { NAME_CHN: '辽宁', center: [123.429096, 41.396767] },
  { NAME_CHN: '吉林', center: [125.6245, 43.886841] },
  { NAME_CHN: '黑龙江', center: [127.242464, 46.756967] },
  { NAME_CHN: '上海', center: [122.472644, 31.231706] },
  { NAME_CHN: '江苏', center: [119.767413, 32.541544] },
  { NAME_CHN: '浙江', center: [120.153576, 29.287459] },
  { NAME_CHN: '安徽', center: [117.083042, 31.86119] },
  { NAME_CHN: '福建', center: [118.306239, 26.075302] },
  { NAME_CHN: '江西', center: [115.592151, 27.676493] },
  { NAME_CHN: '山东', center: [118.000923, 36.375807] },
  { NAME_CHN: '河南', center: [113.665412, 33.757975] },
  { NAME_CHN: '湖北', center: [112.598572, 30.984355] },
  { NAME_CHN: '湖南', center: [111.982279, 27.69409] },
  { NAME_CHN: '广东', center: [114.280637, 23.625178] },
  { NAME_CHN: '广西', center: [108.820004, 23.32402] },
  { NAME_CHN: '海南', center: [110.33119, 19.031971] },
  { NAME_CHN: '重庆', center: [107.504962, 29.533155] },
  { NAME_CHN: '四川', center: [103.065735, 30.659462] },
  { NAME_CHN: '贵州', center: [106.713478, 26.578343] },
  { NAME_CHN: '云南', center: [101.712251, 24.540609] },
  { NAME_CHN: '西藏', center: [90.132212, 30.660361] },
  { NAME_CHN: '陕西', center: [108.948024, 34.263161] },
  { NAME_CHN: '甘肃', center: [104.023557, 35.558039] },
  { NAME_CHN: '青海', center: [96.778916, 35.623178] },
  { NAME_CHN: '宁夏', center: [106.278179, 37.46637] },
  { NAME_CHN: '新疆', center: [85.617733, 40.792818] },
  { NAME_CHN: '台湾', center: [121.509062, 24.044332] },
  { NAME_CHN: '香港', center: [115.673355, 21.798951] },
  { NAME_CHN: '澳门', center: [112.54909, 21.798951] },
]

const worlds = [
  {
    NAME_CHN: '委内瑞拉',
    NAME_ENG: 'VENEZUELA',
    center: [-66.58973, 6.42375],
  },
  {
    NAME_CHN: '圭亚那',
    NAME_ENG: 'GUYANA',
    center: [-58.93018, 4.860416],
  },
  {
    NAME_CHN: '厄瓜多尔',
    NAME_ENG: 'ECUADOR',
    center: [-78.18340599999999, -1.831239],
  },
  {
    NAME_CHN: '玻利维亚',
    NAME_ENG: 'Bolivia',
    center: [-63.58865299999999, -16.290154],
  },
  {
    NAME_CHN: '秘鲁',
    NAME_ENG: 'PERU',
    center: [-75.015152, -9.189967],
  },
  {
    NAME_CHN: '巴拉圭',
    NAME_ENG: 'Paraguay',
    center: [-58.443832, -23.442503],
  },
  {
    NAME_CHN: '阿根廷',
    NAME_ENG: 'ARGENTINA',
    center: [-63.61667199999999, -38.416097],
  },
  {
    NAME_CHN: '福克兰群岛（马尔维纳斯）',
    NAME_ENG: 'IS.MALVINAS(CLAIMED BY ARG.&U.K.) (FALKLAND IS.)',
    center: [-59.43161992671398, -51.79568310924129],
  },
  {
    NAME_CHN: '巴西',
    NAME_ENG: 'BRAZIL',
    center: [-51.92528, -14.235004],
  },
  {
    NAME_CHN: '智利',
    NAME_ENG: 'CHILE',
    center: [-71.542969, -35.675147],
  },
  {
    NAME_CHN: '马绍尔群岛',
    NAME_ENG: 'MARSHALL ISLANDS',
    center: [171.37828366714388, 7.09905252336884],
  },
  {
    NAME_CHN: '美国',
    NAME_ENG: 'UNITED STATES',
    center: [-95.712891, 37.09024],
  },
  {
    NAME_CHN: '瑙鲁',
    NAME_ENG: 'Nauru',
    center: [166.931119, -0.531241],
  },
  {
    NAME_CHN: '所罗门群岛',
    NAME_ENG: 'SOLOMON ISLANDS',
    center: [160.156194, -9.64571],
  },
  {
    NAME_CHN: '库克群岛',
    NAME_ENG: 'COOK ISLANDS',
    center: [-159.742729, -20.881743],
  },
  {
    NAME_CHN: '美属萨摩亚',
    NAME_ENG: 'AMERICAN SAMOA',
    center: [-170.43, -14.16],
  },
  {
    NAME_CHN: '瓦努阿图',
    NAME_ENG: 'VANUATU',
    center: [166.959158, -15.376706],
  },
  {
    NAME_CHN: '斐济',
    NAME_ENG: 'Fiji',
    center: [178.3, -18.06],
  },
  {
    NAME_CHN: '汤加',
    NAME_ENG: 'TONGA',
    center: [-175.20909252440447, -21.17675427920163],
  },
  {
    NAME_CHN: '纽埃',
    NAME_ENG: 'Niue',
    center: [-169.85431, -19.070956],
  },
  {
    NAME_CHN: '皮特凯恩',
    NAME_ENG: 'PITCAIRN',
    center: [-130.10142908366942, -25.046912905168767],
  },
  {
    NAME_CHN: '诺福克岛',
    NAME_ENG: 'Norfolk Island',
    center: [167.9494838332413, -29.03714864205947],
  },
  {
    NAME_CHN: '赫德岛和麦克唐纳岛',
    NAME_ENG: 'HEARD ISLAND AND MCDONALD ISLANDS',
    center: [73.513881, -53.09132],
  },
  {
    NAME_CHN: '布维岛',
    NAME_ENG: 'Bouvet Island',
    center: [3.347736, -54.419212],
  },
  {
    NAME_CHN: '北马里亚纳',
    NAME_ENG: 'NORTHERN MARIANA ISLANDS',
    center: [145.45, 15.12],
  },
  {
    NAME_CHN: '南乔治亚岛和南桑德韦奇岛',
    NAME_ENG: 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS',
    center: [-36.60034, -54.388568],
  },
  {
    NAME_CHN: '图瓦卢',
    NAME_ENG: 'TUVALU',
    center: [179.13, -8.31],
  },
  {
    NAME_CHN: '托克劳',
    NAME_ENG: 'TOKELAU',
    center: [-171.822775, -9.180904],
  },
  {
    NAME_CHN: '萨摩亚',
    NAME_ENG: 'Samoa',
    center: [-171.5, -13.5],
  },
  {
    NAME_CHN: '密克罗尼西亚联邦',
    NAME_ENG: 'Micronesia',
    center: [158.09, 6.55],
  },
  {
    NAME_CHN: '瓦利斯和富图纳',
    NAME_ENG: 'WALLIS AND FUTUNA',
    center: [-178.124231, -14.32275],
  },
  {
    NAME_CHN: '科科斯（基林）群岛',
    NAME_ENG: 'Cocos Islands (AUS.)',
    center: [96.844959, -12.169633],
  },
  {
    NAME_CHN: '爱德华王子岛',
    NAME_ENG: 'PRINCE EDWARD ISLAND',
    center: [-78.452, 44],
  },
  {
    NAME_CHN: '巴布亚新几内亚',
    NAME_ENG: 'PAPUA NEW GUINEA',
    center: [143.95555, -6.314992999999999],
  },
  {
    NAME_CHN: '南极洲',
    NAME_ENG: 'ANTARCTICA',
    center: [80, -66.3339],
  },
  {
    NAME_CHN: '法属南部领地',
    NAME_ENG: 'FRENCH SOUTHERN TERRITORIES',
    center: [69.413273, -49.205663],
  },
  {
    NAME_CHN: '法属波利尼西亚',
    NAME_ENG: 'FRENCH POLYNESIA',
    center: [-149.34, -17.32],
  },
  {
    NAME_CHN: '新西兰',
    NAME_ENG: 'NEW ZEALAND',
    center: [174.885971, -40.900557],
  },
  {
    NAME_CHN: '澳大利亚',
    NAME_ENG: 'AUSTRALIA',
    center: [133.775136, -25.274398],
  },
  {
    NAME_CHN: '新喀里多尼亚',
    NAME_ENG: 'NEW CALEDONIA',
    center: [165.618042, -20.904305],
  },
  {
    NAME_CHN: '基里巴斯',
    NAME_ENG: 'KIRIBATI',
    center: [-157.32788394919095, 1.8727066925101354],
  },
  {
    NAME_CHN: '帕劳',
    NAME_ENG: 'PALAU',
    center: [126.66928, 4.285494],
  },
  {
    NAME_CHN: '格陵兰',
    NAME_ENG: 'Greenland',
    center: [-41.139112060540356, 74.75392807617081],
  },
  {
    NAME_CHN: '圣皮埃尔和密克隆',
    NAME_ENG: 'SAINT PIERRE AND MIQUELON',
    center: [-56.306482, 46.953021],
  },
  {
    NAME_CHN: '百慕大',
    NAME_ENG: 'BERMUDA',
    center: [-64.7505, 32.3078],
  },
  {
    NAME_CHN: '巴哈马',
    NAME_ENG: 'BAHAMAS',
    center: [-77.39627999999999, 25.03428],
  },
  {
    NAME_CHN: '特克斯和凯科斯群岛',
    NAME_ENG: 'TURKS AND CAICOS ISLANDS',
    center: [-71.748935, 21.808369],
  },
  {
    NAME_CHN: '开曼群岛',
    NAME_ENG: 'CAYMAN ISLANDS',
    center: [-81.24, 19.2],
  },
  {
    NAME_CHN: '海地',
    NAME_ENG: 'HAITI',
    center: [-72.285215, 18.971187],
  },
  {
    NAME_CHN: '多米尼加',
    NAME_ENG: 'DOMINICAN REPUBLIC',
    center: [-70.10781976945631, 18.6062039689386],
  },
  {
    NAME_CHN: '安圭拉',
    NAME_ENG: 'ANGUILLA',
    center: [-63.051843, 18.228802],
  },
  {
    NAME_CHN: '牙买加',
    NAME_ENG: 'JAMAICA',
    center: [-77.297508, 18.109581],
  },
  {
    NAME_CHN: '圣基茨和尼维斯',
    NAME_ENG: 'ST.KITTS AND NEVIS',
    center: [-62.43, 17.17],
  },
  {
    NAME_CHN: '安提瓜和巴布达',
    NAME_ENG: 'ANTIGUA AND BARBUDA',
    center: [-61.787041, 17.633014],
  },
  {
    NAME_CHN: '蒙特塞拉特',
    NAME_ENG: 'Montserrat',
    center: [-62.195694, 16.744909],
  },
  {
    NAME_CHN: '伯利兹',
    NAME_ENG: 'BELIZE',
    center: [-88.49765, 17.189877],
  },
  {
    NAME_CHN: '瓜德罗普',
    NAME_ENG: 'GUADELOUPE',
    center: [-61.533041, 16.23517],
  },
  {
    NAME_CHN: '危地马拉',
    NAME_ENG: 'GUATEMALA',
    center: [-90.23075899999999, 15.783471],
  },
  {
    NAME_CHN: '多米尼克',
    NAME_ENG: 'Dominica',
    center: [61.23, 15.18],
  },
  {
    NAME_CHN: '马提尼克',
    NAME_ENG: 'MARTINIQUE',
    center: [-61.015667, 14.658232],
  },
  {
    NAME_CHN: '圣卢西亚',
    NAME_ENG: 'St. Lucia',
    center: [-60.58, 14.02],
  },
  {
    NAME_CHN: '萨尔瓦多',
    NAME_ENG: 'EL SALVADOR',
    center: [-88.89653, 13.794185],
  },
  {
    NAME_CHN: '洪都拉斯',
    NAME_ENG: 'HONDURAS',
    center: [-86.241905, 15.199999],
  },
  {
    NAME_CHN: '巴巴多斯',
    NAME_ENG: 'Barbados',
    center: [-59.540064, 13.180145],
  },
  {
    NAME_CHN: '圣文森特和格林纳丁斯',
    NAME_ENG: 'SAINT VINCENT AND THE GRENADINES',
    center: [-61.1, 13.1],
  },
  {
    NAME_CHN: '阿鲁巴',
    NAME_ENG: 'Aruba',
    center: [-70.02, 12.32],
  },
  {
    NAME_CHN: '哥伦比亚',
    NAME_ENG: 'COLOMBIA',
    center: [-74.297333, 4.570868],
  },
  {
    NAME_CHN: '格林纳达',
    NAME_ENG: 'GRENADA',
    center: [-61.679059, 12.133773],
  },
  {
    NAME_CHN: '特立尼达和多巴哥',
    NAME_ENG: 'TRINIDAD AND TOBAGO',
    center: [-61.196506, 10.394876],
  },
  {
    NAME_CHN: '哥斯达黎加',
    NAME_ENG: 'COSTA RICA',
    center: [-83.753428, 9.748916999999999],
  },
  {
    NAME_CHN: '克利珀顿岛（法）',
    NAME_ENG: 'Clipperton Island (France)',
    center: [-110.98341966855276, 18.81129657181991],
  },
  {
    NAME_CHN: '英属维尔京群岛',
    NAME_ENG: 'Virgin Islands（U.K.）',
    center: [-64.61787, 18.429153],
  },
  {
    NAME_CHN: '美属维尔京群岛',
    NAME_ENG: 'VIRGIN ISLANDS,U.S.',
    center: [-64.773052, 17.738573],
  },
  {
    NAME_CHN: '波多黎各',
    NAME_ENG: 'PUERTO RICO',
    center: [-66.590149, 18.220833],
  },
  {
    NAME_CHN: '尼加拉瓜',
    NAME_ENG: 'NICARAGUA',
    center: [-85.207229, 12.865416],
  },
  {
    NAME_CHN: '墨西哥',
    NAME_ENG: 'MEXICO',
    center: [-102.552784, 23.634501],
  },
  {
    NAME_CHN: '古巴',
    NAME_ENG: 'CUBA',
    center: [-77.781167, 21.521757],
  },
  {
    NAME_CHN: '加拿大',
    NAME_ENG: 'CANADA',
    center: [-106.346771, 56.130366],
  },
  {
    NAME_CHN: '斯瓦尔巴岛和扬马延岛',
    NAME_ENG: 'SVALBARD AND JAN MAYEN',
    center: [15.32408, 78.602372],
  },
  {
    NAME_CHN: '瑞典',
    NAME_ENG: 'SWEDEN',
    center: [18.643501, 60.12816100000001],
  },
  {
    NAME_CHN: '冰岛',
    NAME_ENG: 'ICELAND',
    center: [-19.020835, 64.963051],
  },
  {
    NAME_CHN: '挪威',
    NAME_ENG: 'NORWAY',
    center: [8.468945999999999, 60.47202399999999],
  },
  {
    NAME_CHN: '法罗群岛',
    NAME_ENG: 'FAROE ISLANDS',
    center: [-6.56, 62.05],
  },
  {
    NAME_CHN: '芬兰',
    NAME_ENG: 'FINLAND',
    center: [25.748151, 61.92410999999999],
  },
  {
    NAME_CHN: '英国',
    NAME_ENG: 'UNITED KINGDOM',
    center: [-3.435973, 55.378051],
  },
  {
    NAME_CHN: '爱沙尼亚',
    NAME_ENG: 'ESTONIA',
    center: [25.013607, 58.595272],
  },
  {
    NAME_CHN: '拉脱维亚',
    NAME_ENG: 'Latvia',
    center: [24.603189, 56.879635],
  },
  {
    NAME_CHN: '立陶宛',
    NAME_ENG: 'LITHUANIA',
    center: [23.881275, 55.169438],
  },
  {
    NAME_CHN: '丹麦',
    NAME_ENG: 'DENMARK',
    center: [9.501785, 56.26392],
  },
  {
    NAME_CHN: '白俄罗斯',
    NAME_ENG: 'Belarus',
    center: [27.953389, 53.709807],
  },
  {
    NAME_CHN: '德国',
    NAME_ENG: 'GERMANY',
    center: [10.451526, 51.165691],
  },
  {
    NAME_CHN: '荷兰',
    NAME_ENG: 'NETHERLANDS',
    center: [5.291265999999999, 52.132633],
  },
  {
    NAME_CHN: '波兰',
    NAME_ENG: 'POLAND',
    center: [19.145136, 51.919438],
  },
  {
    NAME_CHN: '爱尔兰',
    NAME_ENG: 'IRELAND',
    center: [-8.24389, 53.41291],
  },
  {
    NAME_CHN: '比利时',
    NAME_ENG: 'Belgium',
    center: [4.469936, 50.503887],
  },
  {
    NAME_CHN: '卢森堡',
    NAME_ENG: 'Letzebuerg',
    center: [6.129582999999999, 49.815273],
  },
  {
    NAME_CHN: '捷克',
    NAME_ENG: 'Czech Republic',
    center: [14.22, 50.05],
  },
  {
    NAME_CHN: '斯洛伐克',
    NAME_ENG: 'Slovakia',
    center: [19.699024, 48.669026],
  },
  {
    NAME_CHN: '摩尔多瓦',
    NAME_ENG: 'Moldova',
    center: [28.369885, 47.411631],
  },
  {
    NAME_CHN: '奥地利',
    NAME_ENG: 'Austria',
    center: [14.550072, 47.516231],
  },
  {
    NAME_CHN: '匈牙利',
    NAME_ENG: 'Hungary',
    center: [19.503304, 47.162494],
  },
  {
    NAME_CHN: '瑞士',
    NAME_ENG: 'Switzerland',
    center: [8.227511999999999, 46.818188],
  },
  {
    NAME_CHN: '列支敦士登',
    NAME_ENG: 'Liechtenstein',
    center: [9.31, 47.08],
  },
  {
    NAME_CHN: '斯洛文尼亚',
    NAME_ENG: 'Slovenia',
    center: [14.995463, 46.151241],
  },
  {
    NAME_CHN: '罗马尼亚',
    NAME_ENG: 'ROMANIA',
    center: [24.96676, 45.943161],
  },
  {
    NAME_CHN: '塞尔维亚',
    NAME_ENG: 'Serbia',
    center: [20.27, 44.49],
  },
  {
    NAME_CHN: '波黑',
    NAME_ENG: 'Bosnia and Herzegovina',
    center: [18.26, 43.52],
  },
  {
    NAME_CHN: '克罗地亚',
    NAME_ENG: 'CROATIA',
    center: [15.2, 45.1],
  },
  {
    NAME_CHN: '圣马力诺',
    NAME_ENG: 'San Marino',
    center: [12.3, 43.55],
  },
  {
    NAME_CHN: '摩纳哥',
    NAME_ENG: 'Monaco',
    center: [7.421904, 43.737664],
  },
  {
    NAME_CHN: '意大利',
    NAME_ENG: 'ITALY',
    center: [12.56738, 41.87194],
  },
  {
    NAME_CHN: '保加利亚',
    NAME_ENG: 'Bulgaria',
    center: [25.48583, 42.733883],
  },
  {
    NAME_CHN: '安道尔',
    NAME_ENG: 'Andorra',
    center: [1.32, 42.31],
  },
  {
    NAME_CHN: '北马其顿',
    NAME_ENG: 'Republic of North Macedonia',
    center: [21.26, 42.01],
  },
  {
    NAME_CHN: '黑山',
    NAME_ENG: 'MONTENEGRO',
    center: [19.251107, 42.890781],
  },
  {
    NAME_CHN: '梵蒂冈',
    NAME_ENG: 'Vatican City',
    center: [12.453298, 41.902784],
  },
  {
    NAME_CHN: '阿尔巴尼亚',
    NAME_ENG: 'ALBANIA',
    center: [20.168331, 41.153332],
  },
  {
    NAME_CHN: '希腊',
    NAME_ENG: 'GREECE',
    center: [21.824312, 39.074208],
  },
  {
    NAME_CHN: '直布罗陀',
    NAME_ENG: 'Gibraltar',
    center: [-5.353815, 36.140876],
  },
  {
    NAME_CHN: '马耳他',
    NAME_ENG: 'MALTA',
    center: [14.31, 35.54],
  },
  {
    NAME_CHN: '西班牙',
    NAME_ENG: 'SPAIN',
    center: [-3.74922, 40.46366700000001],
  },
  {
    NAME_CHN: '葡萄牙',
    NAME_ENG: 'PORTUGAL',
    center: [-8.224454, 39.39987199999999],
  },
  {
    NAME_CHN: '亚美尼亚',
    NAME_ENG: 'ARMENIA',
    center: [45.038189, 40.069099],
  },
  {
    NAME_CHN: '叙利亚',
    NAME_ENG: 'Syria',
    center: [38.996815, 34.80207499999999],
  },
  {
    NAME_CHN: '黎巴嫩',
    NAME_ENG: 'Lebanon',
    center: [35.862285, 33.854721],
  },
  {
    NAME_CHN: '伊拉克',
    NAME_ENG: 'IRAQ',
    center: [43.679291, 33.223191],
  },
  {
    NAME_CHN: '科威特',
    NAME_ENG: 'KUWAIT',
    center: [47.481766, 29.31166],
  },
  {
    NAME_CHN: '马尔代夫',
    NAME_ENG: 'MALDIVES',
    center: [73.28, 4.0],
  },
  {
    NAME_CHN: '文莱',
    NAME_ENG: 'BRUNEI',
    center: [114.727669, 4.535277],
  },
  {
    NAME_CHN: '东帝汶',
    NAME_ENG: 'EAST TIMOR',
    center: [125.727539, -8.874217],
  },
  {
    NAME_CHN: '圣诞岛（澳）',
    NAME_ENG: 'Christmas Island (AUS.)',
    center: [105.632738, -10.488649],
  },
  {
    NAME_CHN: '约旦',
    NAME_ENG: 'Jordan',
    center: [36.238414, 30.585164],
  },
  {
    NAME_CHN: '巴林',
    NAME_ENG: 'BAHRAIN',
    center: [50.3, 26.1],
  },
  {
    NAME_CHN: '卡塔尔',
    NAME_ENG: 'QATAR',
    center: [51.183884, 25.354826],
  },
  {
    NAME_CHN: '格鲁吉亚',
    NAME_ENG: 'Georgia',
    center: [-82.9000751, 32.1656221],
  },
  {
    NAME_CHN: '以色列',
    NAME_ENG: 'Israel',
    center: [34.851612, 31.046051],
  },
  {
    NAME_CHN: '塞浦路斯',
    NAME_ENG: 'Cyprus',
    center: [33.429859, 35.126413],
  },
  {
    NAME_CHN: '伊朗',
    NAME_ENG: 'IRAN',
    center: [53.688046, 32.427908],
  },
  {
    NAME_CHN: '孟加拉国',
    NAME_ENG: 'BANGLADESH',
    center: [90.356331, 23.684994],
  },
  {
    NAME_CHN: '新加坡',
    NAME_ENG: 'SINGAPORE',
    center: [103.864154, 1.362735],
  },
  {
    NAME_CHN: '乌兹别克斯坦',
    NAME_ENG: 'UZBEKISTAN',
    center: [64.585262, 41.377491],
  },
  {
    NAME_CHN: '英属印度洋领地',
    NAME_ENG: 'BRITISH INDIAN OCEAN TERRITORY',
    center: [72.452623, -7.304313],
  },
  {
    NAME_CHN: '柬埔寨',
    NAME_ENG: 'CAMBODIA',
    center: [104.990963, 12.565679],
  },
  {
    NAME_CHN: '泰国',
    NAME_ENG: 'THAILAND',
    center: [100.992541, 15.870032],
  },
  {
    NAME_CHN: '土耳其',
    NAME_ENG: 'TURKEY',
    center: [35.243322, 38.963745],
  },
  {
    NAME_CHN: '阿曼',
    NAME_ENG: 'OMAN',
    center: [55.923255, 21.512583],
  },
  {
    NAME_CHN: '斯里兰卡',
    NAME_ENG: 'SRILANKA',
    center: [80.77179699999999, 7.873053999999999],
  },
  {
    NAME_CHN: '印度尼西亚',
    NAME_ENG: 'INDONESIA',
    center: [106.515414, -6.10304],
  },
  {
    NAME_CHN: '马来西亚',
    NAME_ENG: 'MALAYSIA',
    center: [101.975766, 4.210484],
  },
  {
    NAME_CHN: '土库曼斯坦',
    NAME_ENG: 'TURKMENISTAN',
    center: [59.556278, 38.969719],
  },
  {
    NAME_CHN: '韩国',
    NAME_ENG: 'KOREA, REPUBLIC OF',
    center: [127.766922, 35.907757],
  },
  {
    NAME_CHN: '日本',
    NAME_ENG: 'JAPAN',
    center: [138.252924, 36.204824],
  },
  {
    NAME_CHN: '阿塞拜疆',
    NAME_ENG: 'Azerbaijan',
    center: [47.576927, 40.143105],
  },
  {
    NAME_CHN: '菲律宾',
    NAME_ENG: 'PHILIPPINES',
    center: [121.774017, 12.879721],
  },
  {
    NAME_CHN: '阿尔及利亚',
    NAME_ENG: 'ALGERIA',
    center: [1.659626, 28.033886],
  },
  {
    NAME_CHN: '突尼斯',
    NAME_ENG: 'TUNISIA',
    center: [9.537499, 33.886917],
  },
  {
    NAME_CHN: '利比亚',
    NAME_ENG: 'LIBYA',
    center: [17.228331, 26.3351],
  },
  {
    NAME_CHN: '摩洛哥',
    NAME_ENG: 'MOROCCO',
    center: [-7.092619999999999, 31.791702],
  },
  {
    NAME_CHN: '埃及',
    NAME_ENG: 'EGYPT',
    center: [30.802498, 26.820553],
  },
  {
    NAME_CHN: '马里',
    NAME_ENG: 'Mali',
    center: [-3.996166, 17.570692],
  },
  {
    NAME_CHN: '毛里塔尼亚',
    NAME_ENG: 'MAURITANIA',
    center: [-10.940835, 21.00789],
  },
  {
    NAME_CHN: '尼日尔',
    NAME_ENG: 'Niger',
    center: [8.081666, 17.607789],
  },
  {
    NAME_CHN: '塞内加尔',
    NAME_ENG: 'SENEGAL',
    center: [-14.452362, 14.497401],
  },
  {
    NAME_CHN: '佛得角',
    NAME_ENG: 'CAPE VERDE',
    center: [-23.34, 15.02],
  },
  {
    NAME_CHN: '埃塞俄比亚',
    NAME_ENG: 'Ethiopia',
    center: [40.489673, 9.145000000000001],
  },
  {
    NAME_CHN: '冈比亚',
    NAME_ENG: 'Gambia',
    center: [-15.310139, 13.443182],
  },
  {
    NAME_CHN: '布基纳法索',
    NAME_ENG: 'Burkina Faso',
    center: [-1.561593, 12.238333],
  },
  {
    NAME_CHN: '厄立特里亚',
    NAME_ENG: 'ERITREA',
    center: [39.782334, 15.179384],
  },
  {
    NAME_CHN: '几内亚比绍',
    NAME_ENG: 'GUINEA-BISSAU',
    center: [-15.180413, 11.803749],
  },
  {
    NAME_CHN: '吉布提',
    NAME_ENG: 'DJIBOUTI',
    center: [42.590275, 11.825138],
  },
  {
    NAME_CHN: '几内亚',
    NAME_ENG: 'GUINEA',
    center: [-9.696645, 9.945587],
  },
  {
    NAME_CHN: '乍得',
    NAME_ENG: 'Chad',
    center: [18.732207, 15.454166],
  },
  {
    NAME_CHN: '尼日利亚',
    NAME_ENG: 'NIGERIA',
    center: [8.675277, 9.081999],
  },
  {
    NAME_CHN: '科特迪瓦',
    NAME_ENG: 'COTE D’IVOIRE',
    center: [-5.378034917359486, 7.80736775436047],
  },
  {
    NAME_CHN: '中非',
    NAME_ENG: 'Central Africa',
    center: [20.482687551392672, 6.576510315517837],
  },
  {
    NAME_CHN: '加纳',
    NAME_ENG: 'Ghana',
    center: [-1.023194, 7.946527],
  },
  {
    NAME_CHN: '塞拉利昂',
    NAME_ENG: 'SIERRA LEONE',
    center: [-11.779889, 8.460555],
  },
  {
    NAME_CHN: '贝宁',
    NAME_ENG: 'Benin',
    center: [2.315834, 9.30769],
  },
  {
    NAME_CHN: '多哥',
    NAME_ENG: 'Togo',
    center: [0.824782, 8.619543],
  },
  {
    NAME_CHN: '利比里亚',
    NAME_ENG: 'Liberia',
    center: [-9.429499000000002, 6.428055],
  },
  {
    NAME_CHN: '乌干达',
    NAME_ENG: 'Uganda',
    center: [32.290275, 1.373333],
  },
  {
    NAME_CHN: '赤道几内亚',
    NAME_ENG: 'EQUATORIAL GUINEA',
    center: [10.267895, 1.650801],
  },
  {
    NAME_CHN: '刚果',
    NAME_ENG: 'Congo',
    center: [15.99866764209861, -0.2996622342036943],
  },
  {
    NAME_CHN: '圣多美和普林西比',
    NAME_ENG: 'SAO TOME AND PRINCIPE',
    center: [6.39, 0.1],
  },
  {
    NAME_CHN: '加蓬',
    NAME_ENG: 'GABON',
    center: [11.609444, -0.803689],
  },
  {
    NAME_CHN: '索马里',
    NAME_ENG: 'SOMALIA',
    center: [46.199616, 5.152149],
  },
  {
    NAME_CHN: '卢旺达',
    NAME_ENG: 'Rwanda',
    center: [29.873888, -1.940278],
  },
  {
    NAME_CHN: '肯尼亚',
    NAME_ENG: 'KENYA',
    center: [37.906193, -0.023559],
  },
  {
    NAME_CHN: '刚果民主共和国',
    NAME_ENG: 'D.R.CONGO',
    center: [21.758664, -4.038333],
  },
  {
    NAME_CHN: '布隆迪',
    NAME_ENG: 'Burundi',
    center: [29.918886, -3.373056],
  },
  {
    NAME_CHN: '坦桑尼亚',
    NAME_ENG: 'TANZANIA',
    center: [35.45, -6.08],
  },
  {
    NAME_CHN: '安哥拉',
    NAME_ENG: 'ANGOLA',
    center: [17.873887, -11.202692],
  },
  {
    NAME_CHN: '塞舌尔',
    NAME_ENG: 'SEYCHELLES',
    center: [55.458898, -4.626174],
  },
  {
    NAME_CHN: '马约特',
    NAME_ENG: 'MAYOTTE',
    center: [45.14, -12.48],
  },
  {
    NAME_CHN: '赞比亚',
    NAME_ENG: 'Zambia',
    center: [27.849332, -13.133897],
  },
  {
    NAME_CHN: '马达加斯加',
    NAME_ENG: 'MADAGASCAR',
    center: [46.869107, -18.766947],
  },
  {
    NAME_CHN: '毛里求斯',
    NAME_ENG: 'MAURITIUS',
    center: [57.630969, -20.094797],
  },
  {
    NAME_CHN: '津巴布韦',
    NAME_ENG: 'Zimbabwe',
    center: [29.154857, -19.015438],
  },
  {
    NAME_CHN: '留尼汪',
    NAME_ENG: 'Reunion',
    center: [55.541521663415494, -21.1159035697834],
  },
  {
    NAME_CHN: '纳米比亚',
    NAME_ENG: 'NAMIBIA',
    center: [18.49041, -22.95764],
  },
  {
    NAME_CHN: '博茨瓦纳',
    NAME_ENG: 'Botswana',
    center: [24.684866, -22.328474],
  },
  {
    NAME_CHN: '斯威士兰',
    NAME_ENG: 'Swaziland',
    center: [31.465866, -26.522503],
  },
  {
    NAME_CHN: '莱索托',
    NAME_ENG: 'Lesotho',
    center: [28.233608, -29.609988],
  },
  {
    NAME_CHN: '南非',
    NAME_ENG: 'SOUTH AFRICA',
    center: [22.937506, -30.559482],
  },
  {
    NAME_CHN: '圣赫勒拿',
    NAME_ENG: 'SAINT HELENA',
    center: [-5.695662, -16.005947],
  },
  {
    NAME_CHN: '科摩罗',
    NAME_ENG: 'COMOROS',
    center: [43.872219, -11.875001],
  },
  {
    NAME_CHN: '哈萨克斯坦',
    NAME_ENG: 'KAZAKHSTAN',
    center: [66.923684, 48.019573],
  },
  {
    NAME_CHN: '不丹',
    NAME_ENG: 'Bhutan',
    center: [90.433601, 27.514162],
  },
  {
    NAME_CHN: '阿联酋',
    NAME_ENG: 'UNITED ARAB EMIRATES',
    center: [53.847818, 23.424076],
  },
  {
    NAME_CHN: '乌克兰',
    NAME_ENG: 'UKRAINE',
    center: [31.16558, 48.379433],
  },
  {
    NAME_CHN: '巴基斯坦',
    NAME_ENG: 'PAKISTAN',
    center: [69.34511599999999, 30.375321],
  },
  {
    NAME_CHN: '阿富汗',
    NAME_ENG: 'Afghanistan',
    center: [67.709953, 33.93911],
  },
  {
    NAME_CHN: '塔吉克斯坦',
    NAME_ENG: 'TAJIKISTAN',
    center: [71.276093, 38.861034],
  },
  {
    NAME_CHN: '吉尔吉斯斯坦',
    NAME_ENG: 'Kyrgyzstan',
    center: [74.766098, 41.20438],
  },
  {
    NAME_CHN: '蒙古',
    NAME_ENG: 'Mongolia',
    center: [103.846656, 46.862496],
  },
  {
    NAME_CHN: '越南',
    NAME_ENG: 'VIET NAM',
    center: [108.277199, 14.058324],
  },
  {
    NAME_CHN: '老挝',
    NAME_ENG: 'Laos',
    center: [102.495496, 19.85627],
  },
  {
    NAME_CHN: '印度',
    NAME_ENG: 'INDIA',
    center: [78.96288, 20.593684],
  },
  {
    NAME_CHN: '尼泊尔',
    NAME_ENG: 'Nepal',
    center: [84.12400799999999, 28.394857],
  },
  {
    NAME_CHN: '俄罗斯联邦',
    NAME_ENG: 'Russian Federation',
    center: [96.6719641571928, 61.9950216914894],
  },
  {
    NAME_CHN: '缅甸',
    NAME_ENG: 'Myanmar',
    center: [95.956223, 21.913965],
  },
  {
    NAME_CHN: '朝鲜',
    NAME_ENG: "Democratic People's Republic of Korea",
    center: [126.84884056251002, 40.34935215280976],
  },
  {
    NAME_CHN: '苏丹',
    NAME_ENG: 'Sudan',
    center: [30.217636, 12.862807],
  },
  {
    NAME_CHN: '南苏丹',
    NAME_ENG: 'South Sudan',
    center: [31.3069788, 6.876991899999999],
  },
  {
    NAME_CHN: '莫桑比克',
    NAME_ENG: 'Mozambique',
    center: [35.529562, -18.665695],
  },
  {
    NAME_CHN: '马拉维',
    NAME_ENG: 'Malawi',
    center: [34.301525, -13.254308],
  },
  {
    NAME_CHN: '苏里南',
    NAME_ENG: 'Suriname',
    center: [-56.027783, 3.919305],
  },
  {
    NAME_CHN: '巴拿马',
    NAME_ENG: 'Panama',
    center: [-80.782127, 8.537981],
  },
  {
    NAME_CHN: '喀麦隆',
    NAME_ENG: 'Cameroon',
    center: [12.354722, 7.369721999999999],
  },
  {
    NAME_CHN: '乌拉圭',
    NAME_ENG: 'Uruguay',
    center: [-55.765835, -32.522779],
  },
  {
    NAME_CHN: '也门',
    NAME_ENG: 'YEMEN',
    center: [48.516388, 15.552727],
  },
  {
    NAME_CHN: '沙特阿拉伯',
    NAME_ENG: 'SAUDI ARABIA',
    center: [45.079162, 23.885942],
  },
  {
    NAME_CHN: '库拉索',
    NAME_ENG: 'Curacao',
    center: [-68.98121264406724, 12.180065561841602],
  },
  {
    NAME_CHN: '法属圭亚那',
    NAME_ENG: 'FRENCH GUIANA',
    center: [-53.125782, 3.933889],
  },
  {
    NAME_CHN: '西撒哈拉',
    NAME_ENG: 'WESTERN SAHARA',
    center: [-12.885834, 24.215527],
  },
]

const LabelsData = []

const directions: Record<string, string> = {
  北京: 'top',
  河北: 'right',
  宁夏: 'bottom',
  浙江: 'bottom',
  上海: 'right',
  青海: 'left',
  黑龙江: 'top',
  江苏: 'right',
  安徽: 'top',
  重庆: 'right',
  湖南: 'left',
  澳门: 'bottom',
  香港: 'right',
  台湾: 'bottom',
  内蒙古: 'top',
}
const list = provinces.concat(worlds)
for (let i = 0; i < list.length; i++) {
  const item = list[i]
  const config = {
    name: '',
    position: item.center,
    zooms: [0, 13],
    zIndex: 1,
    opacity: 1,
    text: {
      content: item.NAME_CHN,
      direction: directions[item.NAME_CHN]
        ? directions[item.NAME_CHN]
        : 'center',
      offset: [0, 0],
      zooms: [2, 20],
      style: {
        fontSize: 10,
        fontWeight: 'normal',
        fillColor: '#000',
        strokeColor: '#00',
        strokeWidth: 0,
      },
    },
  }
  LabelsData.push(config)
}

export default LabelsData
