//Login do Departamento de T.I
const adminUsername = 'ti';
const adminPassword = '123';

let loggedUser = null;

//função de deslogar
function logout() {
    loggedUser = null;
    document.getElementById('loginPage').classList.remove('d-none');
    document.getElementById('tiDashboardPage').classList.add('d-none');
    document.getElementById('userDashboardPage').classList.add('d-none');
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var username = document.getElementById('usernameLogin').value;
    var password = document.getElementById('passwordLogin').value;
    var users = JSON.parse(localStorage.getItem('users')) || [];
        //login da T.I
    if (username === adminUsername && password === adminPassword) {
        loggedUser = { username: adminUsername, role: 'admin' };
        document.getElementById('loginPage').classList.add('d-none');
        document.getElementById('tiDashboardPage').classList.remove('d-none');
        loadTickets();
        //Login de usuario
    } else {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            loggedUser = user;
            document.getElementById('loginPage').classList.add('d-none');
            document.getElementById('userDashboardPage').classList.remove('d-none');
            loadUserTickets(user.username);
        } else {
            alert('Usuário ou senha incorretos!');
        }
    }
});

document.getElementById('createUserForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var username = document.getElementById('newUsername').value;
    var password = document.getElementById('newUserPassword').value;
    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário criado com sucesso!');
    document.getElementById('createUserForm').reset();
});

function loadTickets() {
    var tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    var ticketTableBody = document.getElementById('ticketTableBody');
    ticketTableBody.innerHTML = '';
    tickets.forEach((ticket, index) => {
        var tr = document.createElement('tr');
        tr.id = "trid"
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${ticket.username}</td>
            <td>${ticket.problem}</td>
            <td class="priority-${ticket.priority}">${ticket.priority}</td>
            <td>${ticket.date}</td>
            <td>${ticket.status}</td>
            <td class="button-group">
                <button class="btn btn-warning" onclick="assignTicket(${index})">Atribuir</button>
                <button class="btn btn-success" onclick="resolveTicket(${index})">Resolver</button>
                <button class="btn btn-danger" onclick="deleteTicket(${index})">Excluir</button>
            </td>
        `;
        ticketTableBody.appendChild(tr);
    });
}

function deleteTicket(index) {
    var tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.splice(index, 1);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    loadTickets();
}

function assignTicket(index) {
    var tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets[index].status = 'Atribuído ao TI';
    localStorage.setItem('tickets', JSON.stringify(tickets));
    loadTickets();
}

function resolveTicket(index) {
    var tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets[index].status = 'Resolvido';
    localStorage.setItem('tickets', JSON.stringify(tickets));
    loadTickets();
}

document.getElementById('addTicketForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var problem = document.getElementById('userProblem').value;
    var priority = document.getElementById('userPriority').value;
    var date = new Date().toLocaleString();
    var tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.push({ username: loggedUser.username, problem, priority, date, status: 'Aberto' });
    localStorage.setItem('tickets', JSON.stringify(tickets));
    alert('Chamado aberto com sucesso!');
    loadUserTickets(loggedUser.username);
    document.getElementById('addTicketForm').reset();
});

function loadUserTickets(username) {
    var tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    var userTickets = tickets.filter(ticket => ticket.username === username);
    var userTicketTableBody = document.getElementById('userTicketTableBody');
    userTicketTableBody.innerHTML = '';
    userTickets.forEach((ticket, index) => {
        const tr = document.createElement('tr');
        tr.id = "trid"
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${ticket.problem}</td>
            <td>${ticket.priority}</td>
            <td>${ticket.date}</td>
            <td>${ticket.status}</td>
            <td>${ticket.reply || 'Aguardando resposta'}</td>
        `;
        userTicketTableBody.appendChild(tr);
    });
}
 //função de ocultar/mostrar a area de criar usuario
function abrirLogin(){ 
    let visivel =  document.getElementById('CriarUser')
    let classe = visivel.className
    console.log("try");
    if (visivel.classList.contains('d-none')) {
        visivel.classList.remove('d-none');
        console.log(classe);
    } else {
        visivel.classList.add('d-none');
        console.log("false");
    }

}
function abrirChamado(){ 
    let visivel =  document.getElementById('criarChamado')
    let classe = visivel.className
    console.log("try");
    if (visivel.classList.contains('d-none')) {
        visivel.classList.remove('d-none');
        console.log(classe);
    } else {
        visivel.classList.add('d-none');
        console.log("false");
    }

}