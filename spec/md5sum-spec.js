"use babel";

import Md5sum from "../lib/md5sum";
import md5 from "md5";
// import delay from "delay";

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

const delay = function(timeout) {
  return new Promise(function(resolve) {
    setTimeout(resolve, timeout);
  });
};

describe("Md5sum", () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage("md5sum");
  });

  describe("when the md5sum:hash event is triggered", () => {
    fit("hashed whatever is selected", function() {
      waitsForPromise(async () => {
        // SETUP
        const editor = await atom.workspace.open();
        editor.insertText("foo");
        expect(editor.getText()).toBe("foo");
        editor.selectAll();
        
        // TEST
        await atom.commands.dispatch(workspaceElement, "md5sum:hash");
        await activationPromise;
        
        // ASSERT
        expect(editor.getText()).toBe("acbd18db4cc2f85cedef654fccc4a4d8");
      });
    });
  });
});
