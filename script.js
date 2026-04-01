let input = document.getElementById("input");
let output = document.getElementById("output");

let etapa = "user";
let usuario = "";
let tentativas = 0;

boot();

// 🔥 boot inicial
function boot() {
    escrever("Booting STABFX OS...");
    setTimeout(() => escrever("Loading kernel..."), 500);
    setTimeout(() => escrever("Starting system..."), 1000);
    setTimeout(() => {
        escrever("🔐 login:");
    }, 1500);
}

// ENTER
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        let cmd = input.value.trim();
        input.value = "";

        if (etapa === "user") {
            usuario = cmd;
            escrever("login: " + usuario);
            escrever("senha:");
            etapa = "pass";
        }

        else if (etapa === "pass") {
            escrever("senha: ******");

            if (usuario === "admin" && cmd === "1739") {
                escrever("✅ acesso permitido");
                escrever("Bem-vindo, " + usuario);
                etapa = "logado";
            } else {
                tentativas++;
                escrever("❌ acesso negado");

                if (tentativas >= 3) {
                    escrever("💀 BLOQUEADO...");
                    setTimeout(() => {
                        tentativas = 0;
                        escrever("🔐 login:");
                        etapa = "user";
                    }, 3000);
                } else {
                    escrever("🔐 login:");
                    etapa = "user";
                }
            }
        }

        else if (etapa === "logado") {
            executar(cmd);
        }
    }
});

// escrever no terminal
function escrever(texto) {
    output.innerHTML += "<div>> " + texto + "</div>";
    output.scrollTop = output.scrollHeight;
}

// comandos
function executar(cmd) {
    escrever(cmd);
    cmd = cmd.toLowerCase();

    if (cmd === "help//") {
        window.location.href = "comandos.html";
    }

    else if (cmd === "dev//") {
        window.location.href = "dev.html";
    }

    else if (cmd === "sudo root") {
        window.location.href = "root.html";
    }

    else if (cmd === "ls") {
        escrever("comandos.html dev.html root.html boost.html");
    }

    else if (cmd === "whoami") {
        escrever(usuario);
    }

    else if (cmd === "clear") {
        output.innerHTML = "";
    }

    else if (cmd === "logout") {
        escrever("Saindo...");
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    else {
        escrever("❌ comando não encontrado");
    }
}