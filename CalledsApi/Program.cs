// Importações de namespaces essenciais.
using CalledsApi.Data; // Namespace do seu AppDbContext.
using Microsoft.EntityFrameworkCore; // Namespace do Entity Framework.

// Cria o construtor da aplicação web
var builder = WebApplication.CreateBuilder(args);

// --- Seção de Configuração de Serviços (Injeção de Dependência) ---

// Adiciona o AppDbContext ao contêiner de serviços.
builder.Services.AddDbContext<AppDbContext>(options =>
// Configura o Entity Framework para usar o PostgreSQL (Npgsql) e pega a string de conexão do appsettings.json.
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// Adiciona os serviços para os controladores da API.
builder.Services.AddControllers();
// Adiciona os serviços do explorador de API, necessários para o Swagger.
builder.Services.AddEndpointsApiExplorer();
// Adiciona o gerador do Swagger para documentação automática da API.
builder.Services.AddSwaggerGen();

// Adiciona a configuração de CORS (Cross-Origin Resource Sharing
builder.Services.AddCors(options => {
    // Define uma política chamada "AllowAll".
    options.AddPolicy("AllowAll", policy => {
        // Esta política permite requisições de qualquer origem (qualquer site), qualquer método (GET, POST, etc.) e qualquer cabeçalho.
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
// Constrói o aplicativo.
var app = builder.Build();

// --- Seção de Configuração do Pipeline HTTP (Middlewares) ---
// A ordem aqui é importante!

// Aplica a política de CORS "AllowAll" a todas as requisições.
app.UseCors("AllowAll");

// Verifica se o ambiente é de desenvolvimento.
if (app.Environment.IsDevelopment()) {
    // Se for, habilita o Swagger e a interface do Swagger UI.
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Habilita o middleware de autorização.
app.UseAuthorization();
// Mapeia as rotas para os controladores.
app.MapControllers();
// Executa a aplicação.
app.Run();
    