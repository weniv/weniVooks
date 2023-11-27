export const handleClipBoard = async (text) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      alert('주소가 복사되었습니다.');
    } catch (e) {
      alert('주소 복사에 실패하였습니다. 다시 시도해주세요.');
    }
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = 'fixed';

    // 흐름 4.
    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();
    // 흐름 5.
    document.execCommand('copy');
    // 흐름 6.
    document.body.removeChild(textarea);
    alert('클립보드에 복사되었습니다.');
  }
};
