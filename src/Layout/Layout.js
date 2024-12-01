import { Fragment } from "react";

import { Layout } from "antd";
import "./Layout.css";
const { Header, Content, Footer } = Layout;

function DefaultLayout({ children }) {
  return (
    <Fragment>
      <Layout className="layout">
        <Header className="header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi5dBevfo3-7XOwOMnjDO7yVj3dYzpvo8xNPzg7OdPX4559M4e5P8JfFOpyzZ2BMa2dqDgFQ&s" 
        style={{ width: "120px", height: "65px", marginRight: "0px" }}/>
        </Header>
        <Content className="layout-body">{children}</Content>
        {/* <Footer /> */}
      </Layout>
    </Fragment>
  );
}

export default DefaultLayout;
