import Utils from '../utils.js';
import NotesData from '../data/notesData.js';

const home =()=>{
    var myArr = new Array();
    myArr = NotesData.getAll();
    let myKey = '';

    const searchFormElement01 = document.querySelector('search-bar');
    // const searchFormElement = document.getElementById('searchForm'); 
    const addFormElement = document.getElementById('addForm');

    const dataListContainerElement = document.getElementById('dataListContainer');
    const dataQueryWaitingElement = dataListContainerElement.querySelector('.query-waiting');

    
    const dataLoadingElement = dataListContainerElement.querySelector('.search-loading');

    const listElement = dataListContainerElement.querySelector('note-list');




    /* Untuk Menambah data*/
    function clearFormEntry(){
        addFormElement.querySelector('#title').value = '';
        addFormElement.querySelector('#catatan').value = '';
        addFormElement.querySelector('#archived').checked = false;
        
        // searchFormElement01.querySelector('#title').value = '';
    }
    

    function generateToDoObject(title, body, archived){
        const date = new Date().toJSON();
        return {id:+new Date,
                title,
                body, 
                createdAt: date, 
                archived}
    }

    function addNote(event){
        const judul    = event.target.elements.title.value;
        const catatan  = event.target.elements.catatan.value;
        const archived = event.target.elements.archived.checked;
    
        const catatanObject = generateToDoObject(judul, catatan, archived);
        catatanObject.id = 'notes-'+catatanObject.id;

        myArr.push(catatanObject);

        
        if (!myKey) return
        showDataNote(myKey);

        // onSearchHandler01(event);
        // document.dispatchEvent(new Event(RENDER_EVENT));
    
    }

    /* Untuk menampilkan data */

    /* On Search Submit */    

    function searchMyArray(query) {

        return myArr.filter((noteData) => {
            const loweredCaseJudul = (noteData.title || '-').toLowerCase();
            const jammedJudul = loweredCaseJudul.replace(/\s/g,'');
        
            const loweredCaseQuery = query.toLowerCase();
            const jammedQuery = loweredCaseQuery.replace(/\s/g,'');

            return jammedJudul.indexOf(jammedQuery) !== -1;
        });
    }

    const onSearchHandler01 = (event) => {
        event.preventDefault();
        const {query} = event.detail;
        myKey = query;

        showDataNote(query);
    };


    const showDataNote = (query)=>{
        showLoading();

        const result = searchMyArray(query);
        // displayResult(result);
        renderAllNotes(result);

        showDataList();
    }

    const showLoading = ()=>{
        Array.from(dataListContainerElement.children).forEach((element) => {

            Utils.hideElement(element);
        });
        Utils.showElement(dataLoadingElement);
    }

    const renderAllNotes = (notesData) => {
        Utils.emptyElement(listElement);

        notesData.forEach(note => {
            const noteEl = document.createElement("note-item");
            // tambahkan implementasi lainnya
            noteEl.data = note;
            
            listElement.append(noteEl)
        })
    }

    // const displayResult =(resultData) =>{
    //     const dataArr = resultData.map((data) => {
    //         const dataItemElement = document.createElement('note-item');
    //         dataItemElement.data = data;
    //     return dataItemElement;
    //     });

    //     Utils.emptyElement(listElement01);
    //     listElement01.append(...dataArr);
    // }

    const showDataList=() =>{
        Array.from(dataListContainerElement.children).forEach((element) => {
            Utils.hideElement(element);
        });

        Utils.showElement(listElement);
    }

    const showQueryWaiting = () => {
        Array.from(dataListContainerElement.children).forEach((element) => {
            Utils.hideElement(element);
        });

        Utils.showElement(dataQueryWaitingElement);
    }

    // searchFormElement.addEventListener('submit', onSearchHandler);
    // searchFormElement.addEventListener('submit',function(event){
    //     event.preventDefault();
    //     onSearchHandler(event);
    // })

    addFormElement.addEventListener('submit',function(event){
        event.preventDefault();
        addNote(event);
        clearFormEntry();
        // onSearchHandler(event);
    })

    searchFormElement01.addEventListener('search', onSearchHandler01);

    showQueryWaiting();
    
}

export default home;

