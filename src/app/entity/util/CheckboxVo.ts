import {isNullOrUndefined} from "util";

export class CheckboxVo{
  _allChecked:boolean;
  _indeterminate:boolean; // 只有在全选或是 没有全选的情况下 才为true

  constructor(){
    this._allChecked = false;
    this._indeterminate = false;
  }


  /**
   * checkbox全选
   * @param value
   * @private
   */
  _checkAll(value,_dataSet) {
    if(!isNullOrUndefined(_dataSet)){
        if (value) {
          _dataSet.forEach(data => {
            if (!data.disabled) {
              data.checked = true;
            }
          });
        } else {
          _dataSet.forEach(data => data.checked = false);
        }
        this.refreshStatus(_dataSet);
      }
      return _dataSet;
    }

  /**
   * checkbox全选按钮状态
   * @private
   */
  refreshStatus(_dataSet) {
    const allChecked = _dataSet.every(value => value.disabled || value.checked);
    const allUnChecked = _dataSet.every(value => value.disabled || !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }
}
