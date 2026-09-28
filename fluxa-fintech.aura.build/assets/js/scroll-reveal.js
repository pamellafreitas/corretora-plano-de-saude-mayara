document.addEventListener("DOMContentLoaded", () => {
        gsap.registerPlugin(ScrollTrigger);

        function wrapWords(node) {
          if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE' || node.classList?.contains('gsap-reveal-word')) return;
          if (node.nodeType === Node.TEXT_NODE) {
              let text = node.textContent;
              if (!text.trim()) return;
              let words = text.split(/(\s+)/);
              let fragment = document.createDocumentFragment();
              words.forEach(word => {
                  if (word.trim()) {
                      let outer = document.createElement('span');
                      outer.style.display = 'inline-block';
                      outer.style.overflow = 'hidden';
                      outer.style.verticalAlign = 'bottom';

                      let inner = document.createElement('span');
                      inner.style.display = 'inline-block';
                      inner.className = 'gsap-reveal-word';
                      inner.textContent = word;
                      inner.style.willChange = 'transform, opacity, filter';

                      outer.appendChild(inner);
                      fragment.appendChild(outer);
                  } else {
                      fragment.appendChild(document.createTextNode(word));
                  }
              });
              node.parentNode.replaceChild(fragment, node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
              Array.from(node.childNodes).forEach(wrapWords);
          }
        }

        const headings = document.querySelectorAll('h1, h2');
        headings.forEach(heading => {
          wrapWords(heading);
          const words = heading.querySelectorAll('.gsap-reveal-word');
          if(words.length === 0) return;

          gsap.fromTo(words,
              { y: '120%', opacity: 0, filter: 'blur(10px)' },
              {
                  y: '0%',
                  opacity: 1,
                  filter: 'blur(0px)',
                  duration: 1.2,
                  stagger: 0.04,
                  ease: 'power3.out',
                  scrollTrigger: {
                      trigger: heading,
                      start: 'top 85%',
                      toggleActions: 'play none none none'
                  }
              }
          );
        });

        const fadeElements = document.querySelectorAll('p, article, .group, img, h3, h4, details');
        fadeElements.forEach(el => {
          if (el.closest('header') || el.closest('nav')) return;
          gsap.fromTo(el,
              { y: 40, opacity: 0, filter: 'blur(8px)' },
              {
                  y: 0,
                  opacity: 1,
                  filter: 'blur(0px)',
                  duration: 1,
                  ease: 'power2.out',
                  scrollTrigger: {
                      trigger: el,
                      start: 'top 85%',
                      toggleActions: 'play none none none'
                  }
              }
          );
        });
      });