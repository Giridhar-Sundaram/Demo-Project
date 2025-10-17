// app/components/my-date-selector.js

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isOutOfBounds } from 'frontend/constants/utils';

const SPACING = 24;
const PARENT_ID = {
  ember: 'ember-body',
  modal: 'portal',
};

export default class FloatingPicker extends Component {
  @tracked offset = null;
  @tracked pickerPosition = {
    top: 0,
    left: 0,
    display: 'none',
  };

  @action
  receiveOffsetFromModifier(offsetData) {
    console.log(offsetData);
    this.offset = offsetData;
  }

  @action
  openPicker() {
    const parentId = PARENT_ID[this.args.root];
    const parent = document.getElementById('ember-body');

    if (!this.offset || !parent) {
      console.warn('Offset or parent element not found');
      return;
    }

    const outOfBounds = isOutOfBounds(
      this.offset,
      parent,
      this.offset.width,
      this.offset.height,
    );

    let updateTopPosition = SPACING;
    let updateLeftPosition = 0;

    if (outOfBounds.goesOutRight) {
      updateLeftPosition = -(this.offset.width - SPACING);
    }

    if (outOfBounds.goesOutBottom) {
      updateTopPosition = -this.offset.height;
    }

    this.pickerPosition = {
      top: updateTopPosition,
      left: updateLeftPosition,
      display: 'block',
    };
  }

  @action
  closePicker() {
    this.pickerPosition = { top: 0, left: 0, display: 'none' };
  }
}
