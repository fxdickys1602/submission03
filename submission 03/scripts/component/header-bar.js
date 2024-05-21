class HeaderBar extends HTMLElement{
    _style = null;
    _shadowRoot = null;

    constructor(){
        super();
        
        this._shadowRoot = this.attachShadow({mode:'open'});
        this._style  = document.createElement('style');
    }

    _emptyContent(){
        this._shadowRoot.innerHTML = ''
    }

    _updateStyle(){
        this._style.textContent = `
        :host{
            display:block;
            width:100%
            

            color: black;
            background-color: #F0EBE3;
            box-shadow: 0 0 1px 0 rgba(0,0,0, 1);

        }

        div{
            padding-block: 20px;
            padding-inline: px;
        }

        .judul{
            margin:0 0;
            font-size: 2.3em;
            text-align:center
        }
        `
    }
    connectedCallback(){
        this.render();
    }


    render(){
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div>
                <h1 class="judul">My Noted Aplication</h1>
            </div>
        `
    }
}

customElements.define('header-bar',HeaderBar);