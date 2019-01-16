new class ContentScript {

    constructor() {
        this.mouseButton = 1;
        this.anchorSize = 10;
        this.anchorUrl = chrome.extension.getURL('icons/icon-16.png');
        this.forbiddenElements = 'a, button, input, a *, button *';
        this.selectedPosition = null;
        this.createAnchorImage();
        this.bindEvents();
    }

    createAnchorImage() {
        this.anchorImage = new Image();
        this.anchorImage.src = this.anchorUrl;
        this.anchorImage.style.position = 'fixed';
        this.anchorImage.style.width = this.anchorSize + 'px';
        this.anchorImage.style.height = this.anchorSize + 'px';
        this.anchorImage.style.zIndex = 9e9;
        this.anchorImage.style.display = 'none';
        document.body.appendChild(this.anchorImage);
    }

    bindEvents() {
        document.addEventListener('mousemove', event => {
            this.updateAnchorPosition(event.clientX, event.clientY);
        });
        document.addEventListener('mousedown', event => {
            if (event.button === this.mouseButton && !event.target.matches(this.forbiddenElements)) {
                this.toggleScroll();
            }
        });
    }

    updateAnchorPosition(left, top) {
        this.anchorImage.style.left = left + this.anchorSize + 'px';
        this.anchorImage.style.top = top + this.anchorSize + 'px';
    }

    toggleScroll() {
        if (this.selectedPosition) {
            window.scrollTo({
                left: this.selectedPosition.left,
                top: this.selectedPosition.top,
                behavior: 'smooth'
            });
            this.anchorImage.style.display = 'none';
            this.selectedPosition = null;
        } else {
            this.selectedPosition = {
                left: window.scrollX,
                top: window.scrollY
            };
            this.anchorImage.style.display = 'block';
        }
    }

};