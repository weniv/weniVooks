import { useEffect } from 'react';

export function useHeadingBookmark() {
  useEffect(() => {
    const headings = document.querySelectorAll('h4, h5, h6');

    // Get current page information
    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const book = pathParts[1] || '';
    const chapter = pathParts[2] || '';

    // Load bookmarks from localStorage
    const getBookmarks = () => {
      const bookmarks = localStorage.getItem('bookmarks');
      return bookmarks ? JSON.parse(bookmarks) : {};
    };

    // Save bookmark to localStorage
    const saveBookmark = (book, chapter, heading, isBookmarked) => {
      const bookmarks = getBookmarks();

      if (!bookmarks[book]) {
        bookmarks[book] = {};
      }

      if (!bookmarks[book][chapter]) {
        bookmarks[book][chapter] = {};
      }

      if (isBookmarked) {
        bookmarks[book][chapter][heading] = true;
      } else {
        delete bookmarks[book][chapter][heading];

        // Clean up empty objects
        if (Object.keys(bookmarks[book][chapter]).length === 0) {
          delete bookmarks[book][chapter];
        }

        if (Object.keys(bookmarks[book]).length === 0) {
          delete bookmarks[book];
        }
      }

      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    };

    // Check if a heading is bookmarked
    const isBookmarked = (book, chapter, heading) => {
      const bookmarks = getBookmarks();
      return bookmarks[book]?.[chapter]?.[heading] === true;
    };

    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
      }

      const headingText = heading.textContent;

      // Insert wrapper for position
      heading.style.position = 'relative';
      heading.style.display = 'flex';
      heading.style.alignItems = 'center';

      // Create bookmark button
      const bookmark = document.createElement('button');
      bookmark.style.cssText = `
        position:absolute;
        top: calc(8rem + 0.8ex); 
        left: -24px;
        cursor: pointer;
        width: 20px;
        height: 20px;
        background: transparent;
        border: none;
        padding: 0;
        outline: none;
        opacity: 0;
        transition: opacity 0.2s;
      `;
      bookmark.setAttribute('aria-label', 'Toggle bookmark');
      bookmark.type = 'button';

      // Set initial bookmark state
      const bookmarked = isBookmarked(book, chapter, headingText);

      // Set SVG icons using imported components rendered to string
      const filledSVG = `<svg width="20" height="20" viewBox="0 0 40 40" fill="#2E6FF2" xmlns="http://www.w3.org/2000/svg"><path d="M8 4.5C7.17157 4.5 6.5 5.17157 6.5 6V34C6.5 34.5512 6.80235 35.0581 7.28743 35.3199C7.7725 35.5818 8.36212 35.5565 8.82298 35.2541L19.7257 28.0992C19.8922 27.9899 20.1078 27.9899 20.2743 28.0992L31.177 35.2541C31.6379 35.5565 32.2275 35.5818 32.7126 35.3199C33.1976 35.0581 33.5 34.5512 33.5 34V6C33.5 5.17157 32.8284 4.5 32 4.5H8Z" /></svg>`;
      const outlineSVG = `<svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 6C6.5 5.17157 7.17157 4.5 8 4.5H32C32.8284 4.5 33.5 5.17157 33.5 6V34C33.5 34.5512 33.1976 35.0581 32.7126 35.3199C32.2275 35.5818 31.6379 35.5565 31.177 35.2541L20.2743 28.0992C20.1078 27.9899 19.8922 27.9899 19.7257 28.0992L8.82298 35.2541C8.36212 35.5565 7.7725 35.5818 7.28743 35.3199C6.80235 35.0581 6.5 34.5512 6.5 34V6ZM9.5 7.5V31.2215L18.0797 25.591C19.2456 24.8259 20.7544 24.8259 21.9203 25.591L30.5 31.2215V7.5H9.5Z" /></svg>`;

      bookmark.innerHTML = bookmarked ? filledSVG : outlineSVG;

      // Add click event
      bookmark.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const newState = !isBookmarked(book, chapter, headingText);
        saveBookmark(book, chapter, headingText, newState);

        // Update icon
        bookmark.innerHTML = newState ? filledSVG : outlineSVG;
      });

      // Insert bookmark at the beginning of the heading
      heading.insertBefore(bookmark, heading.firstChild);

      // Show bookmark on mouseenter
      heading.addEventListener('mouseenter', () => {
        bookmark.style.opacity = '1';
      });

      // Hide bookmark on mouseleave (always hide when mouse leaves, even if bookmarked)
      heading.addEventListener('mouseleave', () => {
        bookmark.style.opacity = '0';
      });
    });
  }, []);
}
