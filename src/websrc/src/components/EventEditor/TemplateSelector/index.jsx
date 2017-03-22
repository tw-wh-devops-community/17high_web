import React from 'react';

const COLUMN_NUMBER = 3;

class TemplateSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      templates: [
        {id: 1, url: require('../../../image/temp_icon1.png')},
        {id: 2, url: require('../../../image/temp_icon2.png')},
        {id: 3, url: require('../../../image/temp_icon3.png')},
        {id: 4, url: require('../../../image/temp_icon4.png')},
        {id: 5, url: require('../../../image/temp_icon5.png')},
        {id: 6, url: require('../../../image/temp_icon6.png')},
      ],
      selectedTemplate: 0
    }
    ;
  }

  render() {
    return (
      <div className="templateSelectBlock">
        {this.getInputName('选择模板', true)}
        {this.getTemplates(this.state.templates)}
        <div className="previewBlock">
          <div className="preview">
            <img className="previewIcon" src={require("../../../image/preview.png")}/>
            <div className="previewText">预览看看</div>
          </div>
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

  getTemplates(templates) {
    var items = [];
    for (let i = 0; i < templates.length; i++) {
      items.push(this.getTemplateItem(templates[i], i));
    }
    return (
      <div className="templates">
        {items}
      </div>
    )
  }

  getTemplateItem(template, index) {
    let isFirst = index % COLUMN_NUMBER == 0;

    return (
      <TemplateItem
        key={index}
        index={index}
        isFirst={isFirst}
        url={template.url}
        onClick={this.templateClick.bind(this)}
        isSelected={this.state.selectedTemplate == index}
      />
    )
  }

  templateClick(index) {
    if (index == this.state.selectedTemplate) {
      return;
    }
    this.setState({selectedTemplate: index});
    this.props.onSelect(index);
  }
}

class TemplateItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iconStyle: this.props.isSelected ? 'selectedIcon' : 'selectedIconHidden'
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      iconStyle: nextProps.isSelected ? 'selectedIcon' : 'selectedIconHidden'
    });
  }

  render() {
    return (
      <div
        className={this.props.isFirst ? "templateItemFirst" : "templateItem"}
        onClick={() => {
          this.props.onClick(this.props.index);
        }}
      >
        <div>
          <img className='templatesImg' src={this.props.url}/>
          <img className={this.state.iconStyle} src={require("../../../image/selected_icon.png")}/>
        </div>
      </div>

    );
  }

}

export default TemplateSelector;
