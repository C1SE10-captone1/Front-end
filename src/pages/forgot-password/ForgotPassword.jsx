import React, { useState } from 'react';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import './style.less'

const ForgotPassword = () => {

const { Option } = Select;
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const [form] = Form.useForm();
const onFinish = (values) => {
  console.log('Received values of form: ', values);
};
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);
const suffixSelector = (
  <Form.Item name="suffix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="USD">$</Option>
      <Option value="CNY">¥</Option>
    </Select>
  </Form.Item>
);
const [autoCompleteResult, setAutoCompleteResult] = useState([]);
const onWebsiteChange = (value) => {
  if (!value) {
    setAutoCompleteResult([]);
  } else {
    setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
  }
};
const websiteOptions = autoCompleteResult.map((website) => ({
  label: website,
  value: website,
}));
  return (

<div classNameName="row">
		<h1>Forgot Password</h1>
		<h6 className="information-text">Enter your registered email to reset your password.</h6>
		<div className="form-group">
			{/* <Input type="email" name="user_email" id="user_email"> */}
      <Input placeholder="Email" name="user_email" id="user_email"></Input>
			<p><label for="username">Email</label></p>
			<button onclick="showSpinner()">Reset Password</button>
		</div>
		<div className="footer">
			<h5>New here? Sign Up.</h5>
			<h5>Already have an account? Sign In.</h5>
			<p className="information-text"><span className="symbols" title="Lots of love from me to YOU!">&hearts; </span><a href="https://www.facebook.com/adedokunyinka.enoch" target="_blank" title="Connect with me on Facebook">Yinka Enoch Adedokun</a></p>
		</div>
	</div>
  )
}

export default ForgotPassword