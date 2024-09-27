import { Badge, Drawer, List, Space, Typography, Layout, Button, theme } from 'antd';
import { BellFilled, MailOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getComments, getOrders } from '../../api';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const {Header} = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  toogleCollapsed: () => void;
}

interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}

interface Order {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

function AppHeader({collapsed, toogleCollapsed}: AppHeaderProps) {
  const [comments, setComments] = useState<Comment[]>([]); 
  const [orders, setOrders] = useState<Order[]>([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    getComments().then(res => {
      setComments(res.comments);
    });
    getOrders().then(res => {
      setOrders(res.products);
    });
  }, []);

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem 0 0', background: colorBgContainer }}>
      <Button
        className='Toggle'
        onClick={toogleCollapsed}
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      />

      <Space>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>

      <Drawer
        title='Comments'
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        />
      </Drawer>

      <Drawer
        title='Notifications'
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong>
                {item.title}
              </Typography.Text>
              {' '}has been ordered!
            </List.Item>
          )}
        />
      </Drawer>
    </Header>
  )
}

export default AppHeader;
