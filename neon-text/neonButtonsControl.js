const CONFIG = {
    selectors: {
        texts: '.neon-text',
        container: '.neon-text-container',
        buttonsContainer: '.neon-controls',
        buttons: '.neon-controls__button',
        activeButton: '.neon-controls__button--active'
    },
    classes: {
        bordered: 'neon-text-container--bordered',
        active: 'neon-controls__button--active',
        baseText: 'neon-text'
    },
    animations: new Set(['flicker', 'pulse'])
};

const neonTexts = document.querySelectorAll(CONFIG.selectors.texts); 
const neonContainer = document.querySelector(CONFIG.selectors.container);
const neonButtonsControl = document.querySelectorAll(CONFIG.selectors.buttons);
const buttonsContainer = document.querySelector(CONFIG.selectors.buttonsContainer);
const activeAnimation = document.querySelector(CONFIG.selectors.activeButton)?.dataset.animation;

const applyInitialAnimation = () => {
   if (activeAnimation && CONFIG.animations.has(activeAnimation)) {
        neonTexts.forEach(text => 
            text.classList.add(activeAnimation)
        );
    }
}

const clearActiveButtons = () => {
     neonButtonsControl.forEach(
        btn => btn.classList.remove(CONFIG.classes.active)
    );
}

const resetNeonTextClasses = () => {
    const anims = [...CONFIG.animations];
    neonTexts.forEach(t => t.classList.remove(...anims));
}

const handleButtonClick = (e) => {
    const button = e.target.closest(CONFIG.selectors.buttons);
    
    if (!button || !buttonsContainer.contains(button)) {
        return;
    } 

     if (button.dataset.animation === 'border') {
            neonContainer.classList.toggle(CONFIG.classes.bordered);
            return;
    }

    clearActiveButtons();
    resetNeonTextClasses();

    neonTexts.forEach(text => {
        text.classList.add(button.dataset.animation);
    })
    button.classList.add(CONFIG.classes.active);
}

applyInitialAnimation();

buttonsContainer.addEventListener('click', handleButtonClick);
