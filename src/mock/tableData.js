import Mock from 'mockjs'
import { builder, getQueryParameters } from './util'

const titles = [
    'Alipay',
    'Angular',
    'Ant Design',
    'PiV',
    'Bootstrap',
    'React',
    'Vue',
    'Webpack'
]

const avatar = ['https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png'
]

const covers = [
    'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
    'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png'
]

const owner = [
    '付小小',
    '吴加好',
    '周星星',
    '林东东',
    '曲丽丽'
]


const article = (options) => {
    const queryParameters = getQueryParameters(options)
    console.log('queryParameters', queryParameters)
    if (queryParameters && !queryParameters.count) {
        queryParameters.count = 5
    }
    const data = []
    for (let i = 0; i < queryParameters.count; i++) {
        const tmpKey = i + 1
        const num = parseInt(Math.random() * (4 + 1), 10)
        data.push({
            id: tmpKey,
            avatar: avatar[num],
            owner: owner[num],
            star: Mock.mock('@integer(1, 999)'),
            percent: Mock.mock('@integer(1, 999)'),
            like: Mock.mock('@integer(1, 999)'),
            message: Mock.mock('@integer(1, 999)'),
            title: titles[ i % 8 ],
            updatedAt: Mock.mock('@datetime'),
            members: [
                {
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
                    name: '曲丽丽',
                    id: 'member1'
                },
                {
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
                    name: '王昭君',
                    id: 'member2'
                },
                {
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
                    name: '董娜娜',
                    id: 'member3'
                }
            ],
            activeUser: Math.ceil(Math.random() * 100000) + 100000,
            newUser: Math.ceil(Math.random() * 1000) + 1000,
            cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)]
        })
    }
    return builder(data)
}

Mock.mock(/\/api\/list/, 'get', article)
