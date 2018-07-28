'use babel';

import Md5sum from '../lib/md5sum';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Md5sum', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('md5sum');
  });

  describe('when the md5sum:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.md5sum')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'md5sum:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.md5sum')).toExist();

        let md5sumElement = workspaceElement.querySelector('.md5sum');
        expect(md5sumElement).toExist();

        let md5sumPanel = atom.workspace.panelForItem(md5sumElement);
        expect(md5sumPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'md5sum:toggle');
        expect(md5sumPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.md5sum')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'md5sum:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let md5sumElement = workspaceElement.querySelector('.md5sum');
        expect(md5sumElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'md5sum:toggle');
        expect(md5sumElement).not.toBeVisible();
      });
    });
  });
});
