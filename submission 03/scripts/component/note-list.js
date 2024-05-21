import Utils from "../utils.js";

class NoteList extends HTMLElement{
    _style = null; 
    _shadowRoot = null;

    _gutter = 16;
    _column = 2;


    static get observedAttributes(){
        return ['column','gutter'];
    }

    constructor(){
        super();
        this._style = document.createElement('style')
        this._shadowRoot = this.attachShadow({mode:'open'});
    }

    connectedCallback(){
        this.render();
    }

    _emptyContent(){
        this._shadowRoot.innerHTML = '';
    }

    _updateStyle(){
        this._style.textContent = `
            :host{
                display: grid;
            }

            .data-list01{
                box-sizing: border-box;
                display: grid;
                grid-template-columns: ${'1fr '.repeat(this.column)};
                gap: ${this.gutter}px;
                width: 100%;
                padding: 10px 0px;
                // border: 1px dashed rgb(0, 0, 0); 
            }        



            @media only screen and (max-width: 750px) {
                .data-list01{
                    grid-template-columns: 1fr ;
                    grid-template-rows: auto;
                    padding: 10px 0;
                }
            }
                        
        `;
    }

    set column(value){
        const newValue = Number(value);

        if (!Utils.isValidInteger(newValue)) return; 

        this._column = value;
    }

    get column() {
        return this._column;
    }

    set gutter(value){
        const newValue = Number(value)

        if (!Utils.isValidInteger(newValue)) return;

        this._gutter = value;
    }

    get gutter(){
        return this._gutter;
    }

    render(){
        this._emptyContent();
        this._updateStyle();
        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div class="data-list01">
                <slot></slot>
            </div>
        `

    }

}

customElements.define('note-list',NoteList);