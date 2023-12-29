let prevScrollY;

export const handlePreventScroll = () => {
  prevScrollY = window.scrollY;

  setTimeout(() => {
    document.body.style.cssText = `
  position: fixed;
  width: 100%;
  top: -${prevScrollY}px;
  overflow-y: scroll;
`;
  }, 100);
};

export const handleAllowScroll = (scrollY) => {
  document.body.removeAttribute('style');
  window.scrollTo(0, scrollY ? scrollY : prevScrollY);
};
