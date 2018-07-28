'use babel';

import Md5sumView from './md5sum-view';
import { CompositeDisposable } from 'atom';

export default {

  md5sumView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.md5sumView = new Md5sumView(state.md5sumViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.md5sumView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'md5sum:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.md5sumView.destroy();
  },

  serialize() {
    return {
      md5sumViewState: this.md5sumView.serialize()
    };
  },

  toggle() {
    console.log('Md5sum was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
