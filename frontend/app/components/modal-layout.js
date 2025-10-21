import Component from '@glimmer/component';

export default class ModalLayout extends Component {
  portal = null;

  constructor() {
    super(...arguments);

    this.portal = document.getElementById('portal');
    this.portal.style.zIndex = 1000;
    this.portal.style.opacity = 1;
  }

  willDestroy() {
    super.willDestroy(...arguments);

    const closeModal = (portal) => {
      portal.style.zIndex = -1000;
      portal.style.opacity = 0;
    };

    if (this.portal) {
      closeModal(this.portal);
    } else {
      const portal = document.getElementById('portal');
      closeModal(portal);
    }
  }
}
