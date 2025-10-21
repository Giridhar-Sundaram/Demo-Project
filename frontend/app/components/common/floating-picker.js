// app/components/my-date-selector.js

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isOutOfBounds } from 'frontend/constants/utils';
import { TOP_OFFSET, LEFT_OFFSET } from 'frontend/constants/offsets';

const SPACING = 32;

export default class FloatingPicker extends Component {
  @tracked offset = null;
  @tracked pickerPosition = {
    top: -TOP_OFFSET,
    left: -LEFT_OFFSET,
    display: 'none',
  };

  @action
  openWatcher() {
    if (this.args.open) this.openPicker();
    else this.closePicker();
  }
  @action
  receiveOffsetFromModifier(offsetData) {
    this.offset = offsetData;
  }

  @action
  openPicker() {
    console.log('[running - open picker]');
    if (!this.offset) {
      console.warn('Offset or parent element not found');
      return;
    }

    const outOfBounds = isOutOfBounds(
      this.offset,
      this.offset.width,
      this.offset.height,
    );

    let newTopPosition = SPACING;
    let newLeftPosition = 0;

    if (outOfBounds.goesOutRight) {
      console.log(outOfBounds.dr);
      newLeftPosition = -(outOfBounds.deviationRight + SPACING);
    }

    if (outOfBounds.goesOutBottom) {
      newTopPosition = -this.offset.height;
    }

    this.pickerPosition = {
      top: newTopPosition,
      left: newLeftPosition,
    };
  }

  @action
  closePicker() {
    this.pickerPosition = { top: -TOP_OFFSET, left: -LEFT_OFFSET };
  }
}
