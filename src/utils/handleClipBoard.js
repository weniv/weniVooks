export const handleClipBoard = async (text) => {
  const showTooltip = (message) => {
    const codes = Array.from(
      document.querySelectorAll('[data-rehype-pretty-code-fragment]'),
    );

    codes.forEach((code) => {
      if (code.textContent.includes(text)) {
        const tooltip = document.createElement('div');
        tooltip.id = 'clipboard-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.top = '5.2rem';
        tooltip.style.right = '3rem';
        tooltip.style.transform = 'translateX(50%)';
        tooltip.style.backgroundColor = 'var(--grayLv4)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '0.6rem';
        tooltip.style.borderRadius = '0.5rem';
        tooltip.style.zIndex = '1000';
        tooltip.style.display = 'block';
        tooltip.style.textAlign = 'center';

        tooltip.textContent = message;

        // Add pseudo-element for tooltip arrow
        const style = document.createElement('style');
        style.textContent = `
          #clipboard-tooltip::after {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%) translateY(-100%);
            border-width: 0.4rem;
            border-style: solid;
            border-color: transparent transparent var(--grayLv4) transparent;
          }
        `;
        document.head.appendChild(style);
        setTimeout(() => {
          tooltip.style.display = 'none';
        }, 2000);

        if (code.querySelector('pre.weniv-light')) {
          code.append(tooltip);
        }
      }
    });
  };

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      showTooltip('복사 완료');
    } catch (e) {
      showTooltip('실패하였습니다. 다시 시도해주세요.');
    }
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = 'fixed';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showTooltip('복사되었습니다.');
  }
};
