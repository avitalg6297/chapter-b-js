function preventPageFromRefreshing() {
  window.addEventListener('beforeunload', (event) => {
    // window.onbeforeunload = null;
    event.preventDefault();
    // event.returnValue = '';
  });
}