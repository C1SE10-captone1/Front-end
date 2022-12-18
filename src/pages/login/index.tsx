import { FC, useState } from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
import './index.less';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { supabase } from './../../config/supabase';
import { Form, Button, Checkbox, Input } from 'antd';

const LoginForm: FC = () => {
  const [CheckEmail, setCheckEmail] = useState('');

  const [form] = Form.useForm();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const handleSubmit = async e => {
    const email = e.username;

    const password = e.password;

    try {
      const { error } = await signIn({ email, password });
      const { data, err } = await supabase.from('auth.users').select('*');

      console.log(data);

      if (error) throw error;
      toast.success('Login success.', {
        duration: 5000,
      });
      navigate('/');
    } catch (error) {
      toast.error('Email or password incorrect!', {
        duration: 5000,
      });
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="login-page">
          <div className="form-wrapper">
            <span className="logo">SMART GRADE 5</span>
            <span className="title" style={{ fontSize: '25px' }}>
              Login
            </span>
            <Form
              name="basic"
              // labelCol={{
              //   span: 8,
              // }}
              wrapperCol={{
                span: 20,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{ color: '#000' }}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    type: 'email',
                    message: 'Email format is incorrect',
                  },
                  { required: true, message: "Email can't be empty!" },
                ]}
              >
                <Input placeholder="email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password can't be empty!",
                  },
                ]}
              >
                <Input.Password placeholder="password" />
              </Form.Item>
              {/* 
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  // offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

              <Form.Item
              // wrapperCol={{
              //   offset: 8,
              //   span: 16,
              // }}
              >
                <Button type="primary" htmlType="submit">
                  Sign in
                </Button>
              </Form.Item>
            </Form>
            <p style={{ fontSize: '15px' }}>
              You don't have an account? <Link to="/register">Register</Link>
            </p>
            <p style={{ fontSize: '15px' }}>
              forgot password Click here <Link to="/forgot-password">Forgot password</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
