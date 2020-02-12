$( document ).ready( onReady );

function onReady(){
    console.log( 'JQ' );
    getSongs();
}

function getSongs(){
    // make an ajax request to GET songs from server (from db)
    $.ajax({
        type: 'GET',
        url: '/songs'
    }).then( function( response ){
        console.log( 'back from GET with:', response );
    }).catch( function( err ){
        console.log( err );
        alert( 'no worky' );
    }) // end ajax
} // end getSongs