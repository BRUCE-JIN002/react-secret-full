import useCss from "../../hooks/useCss/useCss";
import { Col, Row } from "antd";
import styles from "./style";

const Loading = () => {
  const cardlodingCls = useCss(styles["check-card-loading"]);
  const loadingContentCls = useCss(styles["check-card-loading-content"]);
  return (
    <div className={loadingContentCls}>
      <Row gutter={8}>
        <Col span={22}>
          <div className={cardlodingCls} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={8}>
          <div className={cardlodingCls} />
        </Col>
        <Col span={14}>
          <div className={cardlodingCls} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}>
          <div className={cardlodingCls} />
        </Col>
        <Col span={16}>
          <div className={cardlodingCls} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={13}>
          <div className={cardlodingCls} />
        </Col>
        <Col span={9}>
          <div className={cardlodingCls} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>
          <div className={cardlodingCls} />
        </Col>
        <Col span={4}>
          <div className={cardlodingCls} />
        </Col>
        <Col span={14}>
          <div className={cardlodingCls} />
        </Col>
      </Row>
    </div>
  );
};
export default Loading;
