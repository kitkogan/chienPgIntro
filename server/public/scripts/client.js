$( document ).ready( onReady );

function onReady(){
    $( '#addSongButton' ).on( 'click', addSong );
    $('#songsOut').on('click', '.delete', deleteClick);
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
        displaySongs(response);
    }).catch( function( err ){
        console.log( err );
        alert( 'no worky' );
    }) // end ajax
} // end getSongs

function deleteClick() {
    console.log('delete');
    let selectedId = $(this).parent().data('id');
    // make an ajax request to GET songs from server (from db)
        $.ajax({
            type: 'DELETE',
            url: `/songs/${selectedId}`
        }).then( function( response ){
            console.log( 'back from GET with:', response );
            getSongs();
        }).catch( function( err ){
            console.log( err );
            alert( 'no worky' );
        }) // end ajax
}//end deleteclick

function displaySongs(responseArray){
    console.log('responseArray');
    $('#songsOut').empty();
    //loop through array
    for(let i = 0; i < responseArray.length; i++){

        $('#songsOut').append(`<li data-id="${responseArray[i].id}">${responseArray[i].rank} ${responseArray[i].artist}: ${responseArray[i].track} ${responseArray[i].published}
        <button class="delete">DELETE</button>
        </li>`);
    }
    //append to DOM
}//end displaySongs