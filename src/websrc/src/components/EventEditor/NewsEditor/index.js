import React from 'react';
import EditorBase from '../EditorBase/EditorBase'

class NewsEditor extends EditorBase {

  onRenderContent() {
    return (
      <div>
        <div className='inputBlock'>
          {this.getInputName('新闻名称', true)}
          <div>
            <input name="name" className='newsNameInput' type="text"
                   placeholder="请输入活动名称,20个字内"
                   onBlur={() => {
                     this.validateElement("input[name='name']")
                   }}/>
          </div>
        </div>
        <div className='inputBlock'>
          {this.getInputName('展示时间', true)}
          <div>
            {this.getDateInput()}
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('新闻内容', true)}
          <div>
            <textarea name="description" className='newsDescriptionInput' type="text"
                      placeholder="请输入内容详情，为了方便阅读，建议不超过100字"
                      onBlur={() => {
                        this.validateElement("textarea[name='description']")
                      }}/>
          </div>
        </div>
      </div>
    )
  }

  getEditorType() {
    return 'NEWS';
  }
}

export default NewsEditor;
