// Importa��es de namespaces essenciais.
using CalledsApi.Data; // Namespace do seu AppDbContext.
using Microsoft.EntityFrameworkCore; // Namespace do Entity Framework.

// Cria o construtor da aplica��o web
var builder = WebApplication.CreateBuilder(args);

// --- Se��o de Configura��o de Servi�os (Inje��o de Depend�ncia) ---

// Adiciona o AppDbContext ao cont�iner de servi�os.
builder.Services.AddDbContext<AppDbContext>(options =>
// Configura o Entity Framework para usar o PostgreSQL (Npgsql) e pega a string de conex�o do appsettings.json.
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// Adiciona os servi�os para os controladores da API.
builder.Services.AddControllers();
// Adiciona os servi�os do explorador de API, necess�rios para o Swagger.
builder.Services.AddEndpointsApiExplorer();
// Adiciona o gerador do Swagger para documenta��o autom�tica da API.
builder.Services.AddSwaggerGen();

// Adiciona a configura��o de CORS (Cross-Origin Resource Sharing
builder.Services.AddCors(options => {
    // Define uma pol�tica chamada "AllowAll".
    options.AddPolicy("AllowAll", policy => {
        // Esta pol�tica permite requisi��es de qualquer origem (qualquer site), qualquer m�todo (GET, POST, etc.) e qualquer cabe�alho.
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
// Constr�i o aplicativo.
var app = builder.Build();

// --- Se��o de Configura��o do Pipeline HTTP (Middlewares) ---
// A ordem aqui � importante!

// Aplica a pol�tica de CORS "AllowAll" a todas as requisi��es.
app.UseCors("AllowAll");

// Verifica se o ambiente � de desenvolvimento.
if (app.Environment.IsDevelopment()) {
    // Se for, habilita o Swagger e a interface do Swagger UI.
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Habilita o middleware de autoriza��o.
app.UseAuthorization();
// Mapeia as rotas para os controladores.
app.MapControllers();
// Executa a aplica��o.
app.Run();
    