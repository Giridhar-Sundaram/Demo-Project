import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class EditableHeader extends Component {
  @tracked edit = false;
  @tracked _content = null;

  constructor() {
    super(...arguments);
    this._content = this.args.content;
  }

  get content() {
    return this._content;
  }

  get isTypeHeader() {
    return this.args.type === 'header';
  }

  @action
  flipEdit() {
    this.edit = !this.edit;
  }

  @action
  changeContent(event) {
    if (this.isTypeHeader && event.inputType === 'insertLineBreak') return;
    this._content = event.target.value;
  }

  @action
  cancelEdit() {
    this._content = this.args.content;
    this.flipEdit();
  }

  @action
  submitEdit() {
    this.args.editContent(this._content);
    this.flipEdit();
  }
}
