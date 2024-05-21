class SearchForm extends HTMLElement{
    _style = null
    _shadowRoot = null

    _submitEvent = 'submit';
    _searchEvent = 'search';

    
    constructor(){
        super();
        this._style = document.createElement('style');
        this._shadowRoot = this.attachShadow({mode:'open'});

        this.render();
    }


    connectedCallback(){
        this._shadowRoot
            .querySelector('form')
            .addEventListener('submit', (event)=>this._onFormSubmit(event,this));

        this.addEventListener(this._submitEvent, this._onSearchBarSubmit);
    }

    disconnectedCallback(){
        this._shadowRoot
            .querySelector('form')
            .removeEventListener('submit', (event)=>this._onFormSubmit(event,this));

        this.removeEventListener(this._submitEvent, this._onSearchBarSubmit);
    }

    _onFormSubmit(event, searchBarInstance){
        searchBarInstance.dispatchEvent(new CustomEvent('submit'));

        event.preventDefault();
    }

    
    _onSearchBarSubmit(){
        const query = this._shadowRoot.querySelector('input#title').value;

        if (!query) return;

        this.dispatchEvent(
            new CustomEvent(this._searchEvent, {
                detail: {query},
                bubbles: true,
            }),
        );
    }

    _emptyContent(){
        this._shadowRoot.innerHTML = '';
    }

    _updateStyle(){
        this._style.textContent =`
            :root{
                width: 100%
                border: 2px solid black;
            }

            .search-grup01{
                box-sizing: border-box;
                padding: 0 20px 10px 20px;
                margin: 0;
            }

            .searchForm01{
                width:100%;
                display:grid;
                grid-template-columns: 0.1fr 2fr auto;
                grid-gap: 10px;
                justify-content: center;
                align-items: center;                
            }

            .searchForm01 label{
                font-size: 20px;
                font-weight: lighter;
                padding-right:  20px;
            }
            

            input[type=text], input[type=search], .btn-search:focus, .btn-submit:focus{
                outline: none;
            }
            
            input[type=text], input[type=search]{
                font-family: sans-serif;
                background: #F5F1FF;
                border: 2px solid #827102;
                border-radius: 8px;
                padding: 10px;
                box-sizing: border-box;
                font-size: 15px;
            }

            button {
                width: fit-content;
                font-family: sans-serif;
                border-radius: 16px;
                padding: 10px 20px;
                border: 2px solid #775e06;
                color: black;
                font-size: 15px;
                cursor: pointer;
                height: fit-content;
            }

            @media only screen and (max-width: 750px) {
                .searchForm01{
                    grid-template-columns: 1fr;
                    justify-content: left;
                }
            ?
        `
    }

    render(){
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        
        this._shadowRoot.innerHTML +=`
            <div class="search-grup01">
                <form id="searchForm01" class="searchForm01">
                    <label for="title">Judul</label>
                    <input id="title" name="title" type="search" maxlength="100" required>
                    <button>Search</button>
                </form>
                
            </div>
        `
    }
                // <input type="submit" value="search" name="Submit" class="btn-search">
            }

customElements.define('search-bar',SearchForm)