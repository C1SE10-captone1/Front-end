import { FC, useState } from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
import './index.less';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { supabase } from './../../config/supabase';
import { Form, Button, Checkbox,Input } from 'antd';
// const initialValues: LoginParams = {
//   username: 'guest',
//   password: 'guest',
//   // remember: true
// };

const LoginForm: FC = () => {
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
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

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
      toast.error('User account or password incorrect!', {
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

            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="email" style={{ color: '#000' }} />
              <input type="password" placeholder="password" style={{ color: '#000' }} />

              <button>Sign in</button>
              {err && <span style={{ color: 'red' }}>Something went wrong !</span>}
            </form>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
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
