import React from 'react';
import  'jquery-validation';
import EditorBase from '../EditorBase/EditorBase'

class ActivityEditor extends EditorBase {

  onRenderContent() {
    return (
      <div>
        <div className='inputBlock'>
          {this.getInputName('活动名称', true)}
          <div>
            <input name="name" className='newsNameInput' type="text"
                   placeholder="请输入活动名称,20个字内"
                   onBlur={() => {
                     this.validateElement("input[name='name']")
                   }}
            />
          </div>
        </div>
        <div className='inputBlock'>
          {this.getInputName('活动时间', true)}
          {this.getDateInput()}
        </div>
        <div className="inputBlock">
          {this.getInputName('活动地点', true)}
          <div>
            <input name="location" className='newsNameInput' type="text"
                   placeholder="请输入活动地点，20个字内"
                   onBlur={() => {
                     this.validateElement("input[name='location']")
                   }}
            />
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('主办方', true)}
          <div>
            <input name="organizer" className='newsNameInput' type="text"
                   placeholder="请输入主办方，建议不超过10个字"
                   onBlur={() => {
                     this.validateElement("input[name='organizer']")
                   }}/>
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('活动嘉宾', false)}
          <div>
            <input name="guest" className='newsNameInput' type="text"
                   placeholder="请输入活动嘉宾，建议不超过20个字"/>
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('活动描述', true)}
          <div>
            <textarea name="description" className='newsDescriptionInput' type="text"
                      placeholder="请输入一句简短的宣传语吧，为了显示效果，建议不超过50字"
                      onBlur={() => {
                        this.validateElement("textarea[name='description']")
                      }}/>
          </div>
        </div>
      </div>
    )
  }

  getEditorType(){
    return 'SESSION';
  }
}

export default ActivityEditor
