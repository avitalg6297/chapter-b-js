function preventPageFromRefreshing() {
  window.addEventListener('beforeunload', (event) => {
    // event.stopImmediatePropagation();
    window.onbeforeunload = null;
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // top.window.onbeforeunload = null;
    // Chrome requires returnValue to be set.
    event.returnValue = '';
  });
}