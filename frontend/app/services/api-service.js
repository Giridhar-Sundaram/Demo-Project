import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class ApiService extends Service {
  @tracked csrfToken;

  @service router;

  constructor() {
    super(...arguments);
    const tokenElement = document.querySelector('meta[name="csrf-token"]');

    if (tokenElement) {
      this.csrfToken = tokenElement.content;
    }
  }

  get rootUrl() {
    const protocol = window.location.protocol;
    const host = window.location.host;
    return protocol + '//' + host;
  }

  async get(path) {
    try {
      const response = await fetch(`${this.rootUrl}/${path}`);

      if (!response.ok) {
        throw new Error(
          `HTTP Error fetching data, ${response.status} ${response.statusText}`,
        );
      }

      return await response.json();
    } catch (exception) {
      throw exception;
    }
  }

  async post(path, body) {
    const url = `${this.rootUrl}/${path}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Creation of data failed');
      }
      return await response.json();
    } catch (exception) {
      throw exception;
    }
  }

  async update(path, body) {
    const url = `${this.rootUrl}/${path}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let errorDetails = {};
        try {
          errorDetails = await response.json();
        } catch (e) {}
        throw new Error(
          `API Update Failed (${response.status}): ${JSON.stringify(errorDetails)}`,
        );
      }
      return response.ok;
    } catch (exception) {
      throw exception;
    }
  }

  async delete(path) {
    try {
      const url = `${this.rootUrl}/${path}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken,
        },
      });
      if (!response.ok) {
        throw new Error(`Deletion Failed: HTTP Status ${response.status}`);
      }
      return true;
    } catch (exception) {
      throw exception;
    }
  }

  async logout() {
    const url = 'users/sign_out';

    try {
      const response = await fetch(`${this.rootUrl}/${url}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': this.csrfToken,
        },
        credentials: 'include',
      });

      if (response.status === 204 || response.redirected) {
        this.router.transitionTo('index');
        window.location.reload();
        return true;
      } else {
        throw new Error(`Logout failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
      throw error;
    }
  }
}
