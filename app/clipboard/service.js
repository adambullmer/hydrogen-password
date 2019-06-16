import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { bool } from '@ember/object/computed';
const { clipboard } = requireNode('electron');
const clipboardRestoreTimeout = 30000;

export default Service.extend({
  previousContents: null,
  pendingRestore: null,
  isPending: bool('pendingRestore'),
  toast: service('paperToaster'),

  openServiceToast(message) {
    this.get('toast').show(message, {
      duration: 4000,
      escapeToClose: true,
    });
  },

  copy (input) {
    debugger;
    // Don't save clipboard contents if they are previous pending contents
    if (this.get('isPending')) {
      clearInterval(this.get('pendingRestore'));
      this.set('pendingRestore', null);
    } else {
      this.set('previousContents', clipboard.readText());
    }

    this.openServiceToast('Copied text to clipboard');
    clipboard.writeText(input);
    this.set('pendingRestore', setTimeout(() => {
      this.openServiceToast('Contents have been restored to clipboard');
      clipboard.writeText(this.get('previousContents'));

      this.setProperties({
        previousContents: null,
        pendingRestore: null,
      });
    }, clipboardRestoreTimeout));
  },
});
