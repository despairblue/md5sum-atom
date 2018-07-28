"use babel";

import { CompositeDisposable } from "atom";
import md5 from 'md5'

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "md5sum:hash": () => this.hash()
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },
  
  hash() {
    const editor = atom.workspace.getActiveTextEditor();

    if (editor) {
      console.log("found editor");
      editor.insertText(md5(editor.getSelectedText()))
    }
  }
};
