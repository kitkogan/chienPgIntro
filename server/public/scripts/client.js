$( document ).ready( onReady );

function onReady(){
    $( '#addSongButton' ).on( 'click', addSong );
    getSongs();
}

function addSong(){
    console.log( 'in addSong' );
    // put user input in an object
    let objectToSend = {
        rank: $( '#rankIn' ).val(),
        artist: $( '#artistIn' ).val(),
        track: $( '#trackIn' ).val(),
        published: $( '#publishedIn' ).val()
    }
    // ajax call to server to POST user input
    $.ajax({
        type: 'POST',
        url: '/songs',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST:', response );
        getSongs();
    }).catch( function( err ){
        alert( 'problem adding song' );
        console.log( err );
    }) //end ajax
} //end addSong

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