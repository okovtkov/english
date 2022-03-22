import Ref from '../components/ref/ref';
import '../index.scss';

function Index() {
  return (
    <div className="parts">
      <h1>Выбери часть, которую желаешь повторить</h1>
      <div className="parts__general">
        <Ref part="0">General</Ref>
      </div>
      <div className="parts__another">
        <div className="parts__row">
          <Ref part="1">1</Ref>
          <Ref part="2">2</Ref>
          <Ref part="3">3</Ref>
          <Ref part="4">4</Ref>
        </div>
        <div className="parts__row">
          <Ref part="1">1</Ref>
          <Ref part="2">2</Ref>
          <Ref part="3">3</Ref>
          <Ref part="4">4</Ref>
        </div>
      </div>
    </div>
  );
}

export default Index;
