import React from 'react';
import ReactDOM from 'react-dom';

export class Portal extends React.Component<any, any> {
  render() {
    // 创建一个与兄弟节点平级的新元素
    return ReactDOM.createPortal(
      // 任何可渲染的React元素
      this.props.children,
      // 一个可以插入子节点的DOM元素
      document.body,
    );
  }
}
