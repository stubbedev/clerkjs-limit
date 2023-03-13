/*
Create Clerk Script
*/
(function(w,d){
    var e=d.createElement('script');e.type='text/javascript';e.async=true;
    e.src='https://cdn.clerk.io/clerk.js';
    var s=d.getElementsByTagName('script')[0];s.parentNode.insertBefore(e,s);
    w.__clerk_q=w.__clerk_q||[];w.Clerk=w.Clerk||function(){ w.__clerk_q.push(arguments) };
})(window,document);
/*
Create Clerk Script
*/


const init = (STORE_KEY) => {
    if(typeof window?.Clerk !== 'function' || STORE_KEY === undefined){ return }

    Clerk('config', {
        key: STORE_KEY
    });

    init_utils();
    init_search();
    //init_recs();
    init_jsx();
}

const init_utils = () => {

    // Searchbox Util

    const searchboxes = document.querySelectorAll('input[type=search]');
    if(searchboxes.length > 0){
        searchboxes.forEach(searchbox => {
            searchbox.addEventListener('keydown', (e) => {
                if(e.keyCode === 13){
                    e.preventDefault();
                    const url_params = new URLSearchParams(window.location.search);
                    url_params.set('q', e.target.value);
                    window.location.reload();
                }
            })
        })
    }
}

const init_search = () => {
    if(window.location.search === ''){ return }

    const query = window.location.search.split('?')[1].split('&').forEach(x => {
        if(x.split('=')[0] === 'q'){
            return decodeURI(x.split('=')[1]);
        }
    });

    document.querySelectorAll('[data-query]').forEach(el => {
        el.dataset.query = query;
    });

}

const init_recs = () => {
    // Needs implementing
    const clerk_el_max = 2;
    for(i=0;i<clerk_el_max;i++){
        Clerk('content', `.clerk_${i}`, 'param', {
            limit: parseInt(document.querySelector(`.clerk_${i}`).dataset.limit)
        })
    }
}

const init_jsx = () => {
    // Needs implementing
}