class NoteItem extends HTMLElement{
    _shadowRoot = null;
    _style = null;

    _data = {
        id: null,
        title: null,
        body: null,
        createdAt: null,
        achieved: null,
    }

    constructor(){
        super();

        this._style = document.createElement('style');
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
            :root{
                display:block;
            }

            .card {
                border-radius: 8px;
              
                box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
                background-color: white;
                padding: 8px;
              }
              
              // overflow: hidden;

        `;
    }

    set data(value){
        this._data = value;
        this.render();
    }

    get data(){
        return this._data;
    }

    render(){
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div class="card">
                <h1>${this._data.title}</h1>
                <p>${this._data.body}</p>
                <p>${this._data.createdAt}</p>
            </div>                
        `
    }   
}

customElements.define('note-item', NoteItem)