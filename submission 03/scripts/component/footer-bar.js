class FooterBar extends HTMLElement{
    _style = null;
    _shadowRoot = null

    constructor(){
        super();

        this._style = document.createElement('style');
        this._shadowRoot = this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

    }

    _emptyContent(){
        this._shadowRoot.innerHTML = '';
    }

    _updateStyle(){
        this._style.textContent=`
            :root{
                width:100%;
            }

            .myFooter{
                padding: 20px;
                color: white;
                text-align: center;
                background-color:#2b2207ab;    
                margin-top: 10px;
            }
        `
    }

    attributeChangedCallback(name, oldValue, newValue){
        switch(name) {
            case 'column':
                this.column = newValue;
                break;
            case 'gutter':
                this.gutter = newValue;
                break
        }
        
        this.render();
    }
    
    render(){
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
        <div class="myFooter">
            MyNoted @2024
        </div>
        `
    }
}

customElements.define('footer-bar', FooterBar);