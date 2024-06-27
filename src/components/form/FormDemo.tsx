import { Button, Checkbox, Input } from "antd";
import Form from "./index";
import Space from "../space/Space";

const Basic: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      initialValues={{ remember: true, username: "测试名字" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="w-[300px]"
    >
      <Space direction="vertical" size={8} className="w-full">
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
            { max: 6, message: "长度不能大于 6" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
      </Space>

      <Form.Item>
        <Button
          type="primary"
          size="small"
          htmlType="submit"
          className="w-full mt-8 h-[32px]"
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Basic;
