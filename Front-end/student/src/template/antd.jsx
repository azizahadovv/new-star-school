import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { userIcon } from '../icons';
import { NavbarItems } from '../constanta/const';
const { Header, Content, Footer, Sider } = Layout;


const Antd = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout className='min-h-screen'>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" items={NavbarItems} />
            </Sider>
            <Layout>
                <Header className='px-4 bg-lightGray flex items-center justify-end'>
                    <Link to={'/profile'} className='flex gap-3 items-center justify-center h-full no-underline '>
                        <button className='w-10 h-10 rounded-full overflow-hidden bg-red-700'><img src={userIcon} alt="#" /></button>
                        <div className='fontProDisplay flex items-start justify-center flex-col'>
                            <span className={`text-center leading-7 font-semibold tablet:block text-textBlack capitalize text-2xl`}>Ziyodullayev.T</span>
                            <span className='font-semibold leading-4 text-textGray'>O‘quvchi</span>
                        </div>
                    </Link>
                </Header>
                <Content
                    style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        Bill is a cat.
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Antd;