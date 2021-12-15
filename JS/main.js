const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const imgCarousel = document.querySelector('img');
const indicators = document.querySelectorAll('.indicators > span');
const images = [
  'https://images.unsplash.com/photo-1639430539438-acaa7a95b679?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80', 
  
  'https://images.unsplash.com/photo-1622296999725-fd6600a7603c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
  
  'https://images.unsplash.com/photo-1597905733802-7bec89b471b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'];


  
const setAttr = (el, attr, value) => el.setAttribute(attr, value);
const getAttr = (el, attr) => el.getAttribute(attr);

const getImageIndex = (image) => images.indexOf(image)

const getCurrentImageIndex = () => {
  const currentImage = getAttr(imgCarousel, 'src');
  return getImageIndex(currentImage);
};

const getArrowLeftImageIndex = (currentIndex) => {
  return currentIndex === 0 ? 2 : currentIndex - 1;
};

const getArrowRightImageIndex = (currentIndex) => {
  return currentIndex === 2 ? 0 : currentIndex + 1;
};

const activateIndicator = (index) => {
  indicators.forEach((el, i) => {
    if (el.classList.contains('active')) {
      el.classList.remove('active')
    };
    if (index === i) el.classList.add('active');
  })
};

const intervalSlider = (direction, delay = 3000) => {
  let callback = null, getNewIndexFunc = null;
  if (direction === 'left') {
    getNewIndexFunc = () => getArrowLeftImageIndex(getCurrentImageIndex());

  } else {
    getNewIndexFunc = () => getArrowRightImageIndex(getCurrentImageIndex());
  }

  callback = () => {
    let newIndex = getNewIndexFunc();
    activateIndicator(newIndex);
    setAttr(imgCarousel, 'src', images[newIndex]);
  }

  return () => setInterval(callback, delay);


}
  
const leftInterval = intervalSlider('left');
const rightInterval = intervalSlider('right');

let left = null, right = null;

arrowLeft.addEventListener('click', (e) => {
  const newIndex = getArrowLeftImageIndex(getCurrentImageIndex());
  activateIndicator(newIndex);
  right && clearInterval(right);
  if (!left) {
    left = leftInterval()
  }
  setAttr(imgCarousel, 'src', images[newIndex]);
});
arrowRight.addEventListener('click', (e) => {
  const newIndex = getArrowRightImageIndex(getCurrentImageIndex());
  activateIndicator(newIndex);

  left && clearInterval(left);
  if (!right) {
    right = rightInterval();
  }
  setAttr(imgCarousel, 'src', images[newIndex]);
});