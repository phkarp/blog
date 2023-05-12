import { FC } from 'react';
import { Space, Spin } from 'antd';

import classes from './loader.module.scss';

export const Loader: FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Spin tip="Loading" size="large">
          <div className={classes.loader} />
        </Spin>
      </Space>
    </Space>
  );
};
