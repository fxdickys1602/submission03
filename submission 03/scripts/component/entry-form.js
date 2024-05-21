class EntryForm extends HTMLElement{
    _style ='';
    _shadowRoot = '';
    
    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode:'open'});
        this._style      = document.createElement('style');
        this.render();
    }

    _emptyContent(){
        this._shadowRoot.innerHTML = ''
    }

    _updateContent(){

    }

    
    connectedCallback(){

    }


    render(){

    }
}

customElements.define('entry-form', EntryForm);
