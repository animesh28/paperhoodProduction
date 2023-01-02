export default function parallaxie(selector) {
  let elementBg = document.querySelector(selector);
  let image = elementBg.getAttribute("data-background");
  let position = elementBg.getBoundingClientRect().top * 0.55;

  elementBg.style.backgroundImage = `url("${image}")`;
  elementBg.style.backgroundSize = 'cover';
  elementBg.style.backgroundRepeat = 'no-repeat';
  elementBg.style.backgroundAttachment = 'fixed';
  elementBg.style.backgroundPosition = `center ${position}px`;

  window.onscroll = () => {
    let elements = document.querySelectorAll('.parallaxie[data-background]');

    elements.forEach(element => {
      position = element.getBoundingClientRect().top * 0.55;
      element.style.backgroundPosition = `center ${position}px`;
    });
  }
}