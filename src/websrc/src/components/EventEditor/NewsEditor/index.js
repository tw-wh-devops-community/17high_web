import React from 'react';
import TemplateSelector from '../TemplateSelector';
import css from '../../css/editor.css';

var DatePicker = require('react-datetime');

class NewsEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  render() {
    return (
      <div>
        {this.getForm()}
      </div>
    )
  }


  handleSelect(selectedKey) {
    if (this.state.selectedTab != selectedKey) {
      this.setState({selectedTab: selectedKey})
    }

  }

  getForm() {
    return (
      <div className="formContainer">
        <div className="inputBlock">
          {this.getInputName('新闻名称', true)}
          <div><input className='newsNameInput' type="text" placeholder="请输入活动名称,15个字内"/></div>
        </div>
        <div className="inputBlock">
          {this.getInputName('展示时间', true)}
          <div className="timeBlock">
            <DatePicker className='newsTimeDay' viewMode="days" dateFormat="YYYY-MM-DD" timeFormat={false}/>
            <DatePicker className='newsTimeHour' viewMode="time" dateFormat={false}/>
            <div className='timeDivider'>-</div>
            <DatePicker className='newsTimeDay' viewMode="days" dateFormat="YYYY-MM-DD" timeFormat={false}/>
            <DatePicker className='newsTimeHour' viewMode="time" dateFormat={false}/>
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('新闻内容', true)}
          <div><textarea className='newsDescriptionInput' type="text"/></div>
        </div>
        <TemplateSelector/>
        <div className="newsSubmit">
          <button className="publish" type="submit">发布
          </button>
          <div className="cancelPublish">取消</div>
        </div>
      </div>
    )
  }

  getInputName(name, isRequired) {
    return (
      <div className="inputNameContainer"><span className={isRequired ? 'starChar' : 'starCharHidden'}>*</span>{name}：
      </div>
    )
  }
}

export default NewsEditor;
