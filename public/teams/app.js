'use strict';

const btnCreateTeam = document.querySelector('.team-button-create');
const teamContainer = document.querySelector('#teams-container');

// This Working Good
btnCreateTeam.addEventListener('click', () => {
    let teamName = prompt('Tell me the Team Name than you want create?', 'Team GracoTz');
    createTeam(teamName);
});

// This Working Good
async function createTeam (name) {
    let res = await fetch(`/createTeam`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({name})
    });
    res = await res.json();
    if (res['ok']) printTeamEmpty(name, res['id']);
    else alert(res['message']);
}

// This Working Good
function printTeamEmpty (name, id) {
    let htmlCode = `
    <div data-id='${id}' class="team-con team-con-${id}">
        <span class='w3-button w3-display-topright w3-indigo btn-delete-team' style="right: 1px; top: 1px;" data-id='${id}'>X</span>
        <h2 class="w3-center w3-indigo w3-border">${name}</h2>
        <div class="w3-border w3-center team-con-imgs">
            <h2>Empty</h2>
        </div>
    </div>`;
    teamContainer.innerHTML += htmlCode;
    deleteButtons();
    btnTeamEvent();
}

// This Working Good
async function printTeams () {
    let teams = await fetch('/getTeams');
    teams = await teams.json();
    if (teams.length === 0) {
        teamContainer.innerHTML = '<h1>Not have teams yet</h1>';
    } else {
        let html = '';
        for (const team of teams) {
            let htmlCode = `
                <div data-id='${team['id']}' class="team-con team-con-${team['id']}">
                    <span class='w3-button w3-display-topright w3-indigo btn-delete-team' data-id='${team['id']}' style="right: 1px; top: 1px;">X</span>
                    <h2 class="w3-center w3-indigo w3-border">${team['Name']}</h2>
                    <div class="w3-border w3-center team-con-imgs">`;
            let closes = '</div></div>';
            let teamSize = team['Pokemons'].length;
            if (teamSize === 0) {
                let empty = '<h2>Empty</h2>';
                htmlCode += empty;
                htmlCode += closes;
                html += htmlCode;
            } else {
                for (const poke of team['Pokemons']) {
                    let imgTag = `<img src="../images/pokemons/${poke['Photo']}" class="w3-image team-pokes-imgs" title="${poke['Name']}">`;
                    htmlCode += imgTag;
                }
                htmlCode += closes;
                html += htmlCode;
            }
        }
        teamContainer.innerHTML = html;
        deleteButtons();
        btnTeamEvent();
    }
}

// This Working Good
function deleteButtons () {
    const btnDeleteTeam = document.querySelectorAll('.btn-delete-team');
    btnDeleteTeam.forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.dataset.id;
            fetch(`/deleteTeam/${id}`, {method: 'DELETE'});
            const teamConInfo = document.querySelector(`.team-con-${id}`);
            teamContainer.removeChild(teamConInfo);
        });
    });
}

function btnTeamEvent () {
    const teamsBtn = document.querySelectorAll('.team-con');
    teamsBtn.forEach(team => {
        team.addEventListener('click', function () {
            const id = this.dataset.id;
            window.location.assign(`/seeTeam/${id}`);
        });
    });
}

// This Working Good
async function loadContent () {
    printTeams();
}

loadContent();