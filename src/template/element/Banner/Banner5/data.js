export default {
    wrapper: {
        className: 'home-page-wrapper banner',
    },
    page: {
        className: 'home-page Banner5-page',
    },
    banner: {
        className: 'bannerStyle1',
        children: 'http://ae01.alicdn.com/kf/Hffed4401a739478795f147ccf7aa39856.jpg',
        image: {
            className: 'bannerStyle2',
        },
        title: {
            className: 'bannerStyle4',
            children: 'Chọn 1 Món Yêu thích!',
        },
    },
    tabs: {
        className: 'bannerStyle6',
        children: [
            {
                name: 'tab1',
                className: 'bannerStyle7',
                title: {
                    className: 'bannerStyle9',
                    children: 'US $0,01'
                },
                image: {
                    children: 'https://ae01.alicdn.com/kf/H0cf3e164bc124d53bb4044524daa211co.gif',
                }
            },
            {
                name: 'tab2',
                className: 'bannerStyle7',
                title: {
                    className: 'bannerStyle9',
                    children: 'Phiếu giảm giá US $3'
                },
                image: {
                    children: 'https://ae01.alicdn.com/kf/H64b458bdb4ef4494bf447b9285d8f99fK.png',
                },
            },
            {
                name: 'tab3',
                className: 'bannerStyle7',
                title: {
                    className: 'bannerStyle9',
                    children: 'Giảm giá độc quyền'
                },
                image: {
                    children: 'https://ae01.alicdn.com/kf/H2f9fa58423744efcab44acb6a9f001acd.gif',
                },
            }
        ],
    },
    block: {
        children: [
            {
                name: 'block0',
                tag: {
                    className: 'content7-tag',
                    text: {
                        children: 'PHONE',
                        className: 'content7-tag-name',
                    },
                    icon: { children: 'mobile' },
                },
                content: {
                    className: 'content7-content',
                    text: {
                        className: 'content7-text',
                        md: 14,
                        xs: 24,
                        children: `test1`,
                    },
                    img: {
                        className: 'content7-img',
                        children: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
                        md: 10,
                        xs: 24,
                    },
                },
            },
            {
                name: 'block1',
                tag: {
                    className: 'content7-tag',
                    icon: { children: 'tablet' },
                    text: { className: 'content7-tag-name', children: 'TABLET' },
                },
                content: {
                    className: 'content7-content',
                    text: {
                        className: 'content7-text',
                        md: 14,
                        xs: 24,
                        children: `test2`,
                    },
                    img: {
                        className: 'content7-img',
                        md: 10,
                        xs: 24,
                        children: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
                    },
                },

            },
            {
                name: 'block2',
                tag: {
                    className: 'content7-tag',
                    text: {
                        children: 'DESKTOP',
                        className: 'content7-tag-name',
                    },
                    icon: {
                        children: 'laptop',
                    },
                },
                content: {
                    className: 'content7-content',
                    text: {
                        className: 'content7-text',
                        md: 14,
                        xs: 24,
                        children: `test3`,
                    },
                    img: {
                        className: 'content7-img',
                        md: 10,
                        xs: 24,
                        children: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
                    },
                },
            },
        ],
    },
}