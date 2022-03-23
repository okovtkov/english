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
          <Ref part="5">5</Ref>
          <Ref part="6">6</Ref>
          <Ref part="7">7</Ref>
          <Ref part="8">8</Ref>
        </div>
        <div className="parts__row">
          <Ref part="9">9</Ref>
          <Ref part="10">10</Ref>
          <Ref part="11">11</Ref>
          <Ref part="12">12</Ref>
          <Ref part="13">13</Ref>
        </div>
      </div>
    </div>
  );
}

export default Index;
