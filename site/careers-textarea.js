(() => {
  const textarea = document.querySelector('.careers-form textarea');
  if (!textarea) return;

  const resize = () => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  textarea.addEventListener('input', resize);
  resize();
})();
