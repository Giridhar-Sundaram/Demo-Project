import Component from '@glimmer/component';

export default class ModalLayout extends Component {
  portal = null;

  constructor() {
    super(...arguments);

    this.portal = document.getElementById('portal');
    this.portal.style.display = 'block';
  }

  willDestroy() {
    super.willDestroy(...arguments);

    if (this.portal) {
      this.portal.style.display = 'none';
    } else {
      const portal = document.getElementById('portal');
      portal.style.display = 'none';
    }
  }
}
