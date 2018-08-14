// handle double clicks for buttons within the same function
function getRecentGameList(callback) {
    $.ajax({
        url: '/api/games',
        contentType: 'application/json',
        traditional: true,
        type: 'get',
        success: function(data) {
            callback(data);
        },
        error: function(data) {
            console.warn(data.responseText);
            console.log(data);
        }
    });
}

// AJAX call to delete the game
function deleteClickedGame(id,callback) {
    const url = `/api/games/${id}`;
    $.ajax({
        url: url,
        contentType: 'application/json',
        traditional: true,
        type: 'delete',
        success: function(data) {
            callback(data);
        },
        error: function(data) {
            console.warn(data.responseText);
            console.log(data);
        }
    });
}

// Rendering should factor in the new 0 as -
function renderSpareStrikes(score1, score2, score3 = '') {
    let symbol1, symbol2, symbol3;
    if (score1 == 10 && score2 == 10 && score3 == 10) {
        // XXX
        symbol1, symbol2, symbol3 = 'X';
    } else if (score1 == 10 && score2 == 10 && score3 < 10) {
        // XX3
        symbol1, symbol2 = 'X';
        symbol3 = score3;
    } else if (score1 == 10 && (score2 + score3) == 10) {
        // X2/
        symbol1 = 'X';
        symbol2 = score2;
        symbol3 = '/';
    } else if (score1 == 10 && (score2 + score3) < 10) {
        // X22
        symbol1 = 'X';
        symbol2 = score2;
        symbol3 = score3;
    } else if ((score1 + score2) == 10 && score3 == 10) {
        // 2/X
        symbol1 = score1;
        symbol2 = '/';
        symbol3 = 'X';
    } else if ((score1 + score2) == 10 && score3 < 10) {
        // 2/3
        symbol1 = score1;
        symbol2 = '/';
        symbol3 = score3;
    } else if (score1 == 10) {
        // X
        symbol1 = 'X';
        symbol2, symbol3 = false;
    } else if ((score1 + score2) == 10) {
        // 2/
        symbol1 = score1;
        symbol2 = '/';
        symbol3 = false;
    } else if ((score1 + score2) < 10) {
        // 22
        symbol1 = score1;
        symbol2 = score2;
        symbol3 = false;
    }

    // Render - for every 0
    if (score1 == 0) {
        symbol1 = '-';
    } else if (score2 == 0) {
        symbol2 = '-';
    } else if (score3 == 0) {
        symbol3 = '-';
    }

    return [symbol1, symbol2, symbol3];
}

function renderTDSpanElement(input) {
    return `<span>${input}</span>`;
}



function gameHTMLCard(game, index) {
    // This should generate every game and add it onto the gameList table as a row.
    const gameNumber = parseInt(index);
    let html = `<tr class="game" id="${game._id}">
                    <td class="game-number">${gameNumber}</td>`;
    // This is going through the frames
    for (let j = 1; j < 11; j++) {
        
        const frame = `frame${j}`;
        if (j == 10 && typeof game[frame].score3 !== 'undefined') {
            html += `<td class="frame last-frame">
            <div class="frame-container">
                <div class="input">`;
            const [symbol1, symbol2, symbol3] = renderSpareStrikes(game[frame].score1, game[frame].score2, game[frame].score3);
            html += `${renderTDSpanElement(symbol1)}
                        ${symbol2 ? renderTDSpanElement(symbol2) : ''}
                        ${symbol3 ? renderTDSpanElement(symbol3) : ''}`;
        } else {
            html += `<td class="frame">
            <div class="frame-container">
                <div class="input">`;
            const [symbol1, symbol2] = renderSpareStrikes(game[frame].score1, game[frame].score2);
            html += `${renderTDSpanElement(symbol1)}
                        ${symbol2 ? renderTDSpanElement(symbol2) : ''}`;
        }

        html += `</div>
                    <div class="frame-score">
                        <span>${game[frame].finalScore}</span>
                    </div>
                </div>
                </td>`;
    } // End of going through the frames

    // This is the total
    html += `<td class="total">${game.score}</td>
                <td class="edit" data-id="${game._id}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></td>
                <td class="delete" data-id="${game._id}" data-game-number="${gameNumber}"><i class="fa fa-trash-o" aria-hidden="true"></i></td>
                </tr>`;
    return html;
}

function displayGameList(data) {
    for (index in data) {
        const html = gameHTMLCard(data[index], data.length - index);
        $('#gameList tbody:last-child').append(html);
    }
}

function getAndDisplayGameList() {
    getRecentGameList(displayGameList);
}

function removeGameRow(res) {
    // Receives the id from the ajax successful call and removes the game row with the id
    const id = res.id;
    $('#gameList').find('#' + id).remove();
}

function sidebarClick() {
    $('#score').on('click', (e) => {
        $('#score-content').toggleClass('hidden');
    });
    $('#strikes').on('click', (e) => {
        $('#strikes-content').toggleClass('hidden');
    });
    $('#spares').on('click', (e) => {
        $('#spares-content').toggleClass('hidden');
    });
    $('#open-frames').on('click', (e) => {
        $('#open-frames-content').toggleClass('hidden');
    });
}

function tableButtonClick() {
    // Click event to handle edit button click
    $('#gameList').on('click', '.edit', (e) => {
        // API endpoint not made yet
        console.log(jQuery(e.target).closest('.edit').data('id'));
    });

    $('#gameList').on('click', '.delete', (e) => {
        // There should be a popup confirming if the user wants to go ahead and delete the game
        const gameNumber = jQuery(e.target).closest('.delete').data('game-number');
        console.log(gameNumber);
        let res = confirm(`Are you sure you want to delete Game ${gameNumber}?`);
        if (res == true) {
            const id = jQuery(e.target).closest('.delete').data('id');
            // Call to the delete ajax
            // What should be the call back 
            deleteClickedGame(id, removeGameRow);
            console.log(jQuery(e.target).closest('.delete').data('id'));
        }
    });
}

$(function() {
    getAndDisplayGameList();
    sidebarClick();
    tableButtonClick();
});



// clicking the edit button should direct to the create/edit game field

// Also pagination should be factored into the design of the table and query results
// Also as an added bonus to change your account settings would be nice
